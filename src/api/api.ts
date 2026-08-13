import AwesomeDebouncePromise from "awesome-debounce-promise";
import type WineProduct from "models/product";
import type WineProductV1 from "models/product-v1";

const MAX_RESULTS = 20;
export const MAX_RECOMMENDED_RESULTS = 500;
const DEBOUNCE_TIME = 500;
const REQUEST_TIMEOUT_MS = 10_000;

const API_ENDPOINT = "/wine-api/api";

type ApiErrorKind = "http" | "invalid-response" | "network" | "timeout";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;

  constructor(message: string, kind: ApiErrorKind, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const getHttpErrorMessage = (status: number): string => {
  if (status === 429) {
    return "Vintjenesten har for mange forespørsler. Prøv igjen om litt.";
  }

  if (status >= 500) {
    return "Vintjenesten er midlertidig utilgjengelig. Prøv igjen senere.";
  }

  return "Vintjenesten kunne ikke behandle forespørselen.";
};

const readErrorDetails = async (response: Response): Promise<string | null> => {
  try {
    const body = await response.text();
    if (!body) {
      return null;
    }

    const parsed = JSON.parse(body);
    if (typeof parsed?.message === "string") {
      return parsed.message;
    }
  } catch {
    // The status code remains useful even if an error body cannot be parsed.
  }

  return null;
};

const request = async <T>(
  url: string,
  parseResponse: (response: Response) => Promise<T>,
  accept = "application/json"
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: accept },
      signal: controller.signal,
    });

    if (!response.ok) {
      const details = await readErrorDetails(response);
      throw new ApiError(
        (response.status < 500 && details) ||
          getHttpErrorMessage(response.status),
        "http",
        response.status
      );
    }

    return await parseResponse(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(
        "Forespørselen tok for lang tid. Prøv igjen.",
        "timeout"
      );
    }

    throw new ApiError(
      "Kunne ikke kontakte vintjenesten. Sjekk nettverkstilkoblingen og prøv igjen.",
      "network"
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

const requestJson = <T>(url: string): Promise<T> =>
  request(url, async (response) => {
    const body = await response.text();
    if (!body) {
      throw new ApiError(
        "Vintjenesten returnerte et tomt svar.",
        "invalid-response"
      );
    }

    try {
      return JSON.parse(body) as T;
    } catch {
      throw new ApiError(
        "Vintjenesten returnerte et ugyldig svar.",
        "invalid-response"
      );
    }
  });

const buildApiUrl = (parameters: Record<string, string | number>): string =>
  `${API_ENDPOINT}?${new URLSearchParams(
    Object.entries(parameters).map(([key, value]) => [key, String(value)])
  ).toString()}`;

const ensureWineProducts = (data: unknown): WineProduct[] => {
  if (!Array.isArray(data)) {
    throw new ApiError(
      "Vintjenesten returnerte et uventet svar.",
      "invalid-response"
    );
  }

  return data as WineProduct[];
};

type WineProductOption = {
  value: WineProduct;
  label: string;
};

const searchProductsByNameMapToSelect = async (
  query: string
): Promise<WineProductOption[]> => {
  if (!query.trim()) {
    return [];
  }

  // The api consumes _ instead of spaces
  const trimmedQuery = query.replace(/ /g, "_");
  const result = ensureWineProducts(
    await requestJson<unknown>(
      buildApiUrl({
        productShortNameContains: trimmedQuery,
        maxResults: MAX_RESULTS,
      })
    )
  );

  return result.map((item) => ({
    value: item,
    label: `${item.basic.productShortName} ${item.basic.vintage}`,
  }));
};

// fixme how to implement pasta and pizza..
export type RecommendedFood =
  | { foodId: "A"; foodDescription: "Aperitiff" }
  | { foodId: "B"; foodDescription: "Skalldyr" }
  | { foodId: "C"; foodDescription: "Fisk" }
  | { foodId: "D"; foodDescription: "Lyst kjøtt" }
  | { foodId: "E"; foodDescription: "Storfe" }
  | { foodId: "F"; foodDescription: "Lam og sau" }
  | { foodId: "G"; foodDescription: "Småvilt og fugl" }
  | { foodId: "H"; foodDescription: "Storvilt" }
  | { foodId: "L"; foodDescription: "Ost" }
  | { foodId: "N"; foodDescription: "Dessert, kake, frukt" }
  | { foodId: "Q"; foodDescription: "Svinekjøtt" }
  | { foodId: "R"; foodDescription: "Grønnsaker" };

const buildRecommendedFoodURI = (recommendedFood: RecommendedFood): string => {
  const foodDescriptionTrimmedQuery = recommendedFood.foodDescription.replace(
    / /g,
    "_"
  );
  // format foodId*E*foodDesc*Storfe*
  return `foodId*${recommendedFood.foodId}*foodDesc*${foodDescriptionTrimmedQuery}`;
};

export const fetchWineByRecommendedFood = async (
  recommendedFood: RecommendedFood
): Promise<WineProduct[]> => {
  const recommendedFoodURI = buildRecommendedFoodURI(recommendedFood);
  return ensureWineProducts(
    await requestJson<unknown>(
      buildApiUrl({
        freeText: recommendedFoodURI,
        maxResults: MAX_RECOMMENDED_RESULTS,
      })
    )
  );
};

export const getWine = (id: string): Promise<WineProductV1> =>
  requestJson<WineProductV1>(buildApiUrl({ productId: id }));

export const getWineImage = (id: string): Promise<Blob> =>
  request(
    `https://bilder.vinmonopolet.no/cache/1200x1200-0/${encodeURIComponent(id)}-1.jpg`,
    (response) => response.blob(),
    "image/*"
  );

export const debouncedSearchProductsByNameItem = AwesomeDebouncePromise(
  searchProductsByNameMapToSelect,
  DEBOUNCE_TIME
);
