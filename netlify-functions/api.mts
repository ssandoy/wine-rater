const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no";
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESULTS_LIMIT = 500;
const MAX_TEXT_LENGTH = 200;

// Only the lookups the app performs are forwarded, so the endpoint can't be
// used as a general-purpose proxy for our Vinmonopolet subscription.
const SEARCH_PARAMS = ["productShortNameContains", "freeText", "productId"];

export const config = {
  rateLimit: {
    windowLimit: 60,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};

const getApiSubscriptionKey = (): string | undefined =>
  process.env.VINMONOPOLET_API_SUBSCRIPTION_KEY2 ||
  process.env.VINMONOPOLET_API_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY ||
  process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY2;

const jsonResponse = (
  status: number,
  body: unknown,
  additionalHeaders: HeadersInit = {}
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...Object.fromEntries(new Headers(additionalHeaders)),
    },
  });

const parseJsonResponse = async (response: Response): Promise<unknown> => {
  const body = await response.text();
  if (!body) {
    throw new Error("Vinmonopolet returned an empty response");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error("Vinmonopolet returned invalid JSON");
  }
};

const buildUpstreamQuery = (
  params: URLSearchParams
): URLSearchParams | null => {
  const upstream = new URLSearchParams();

  for (const [key, value] of params) {
    if (key === "maxResults") {
      const maxResults = Number(value);
      if (
        !Number.isInteger(maxResults) ||
        maxResults < 1 ||
        maxResults > MAX_RESULTS_LIMIT
      ) {
        return null;
      }
      upstream.set(key, String(maxResults));
    } else if (key === "productId") {
      if (!/^\d{1,20}$/.test(value)) {
        return null;
      }
      upstream.set(key, value);
    } else if (SEARCH_PARAMS.includes(key)) {
      if (!value || value.length > MAX_TEXT_LENGTH) {
        return null;
      }
      upstream.set(key, value);
    } else {
      return null;
    }
  }

  return SEARCH_PARAMS.some((key) => upstream.has(key)) ? upstream : null;
};

export default async (request: Request): Promise<Response> => {
  if (request.method !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" }, { Allow: "GET" });
  }

  const apiSubscriptionKey = getApiSubscriptionKey();
  if (!apiSubscriptionKey) {
    console.error("Vinmonopolet API subscription key is not configured");
    return jsonResponse(500, { error: "Wine service is not configured" });
  }

  const query = buildUpstreamQuery(new URL(request.url).searchParams);
  if (!query) {
    return jsonResponse(400, { error: "Invalid query" });
  }

  try {
    const response = await fetch(
      `${vinmonopoletBaseUrl}/press-products/v1/details-normal?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Ocp-Apim-Subscription-Key": apiSubscriptionKey,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );

    if (!response.ok) {
      await response.body?.cancel().catch(() => undefined);
      console.error("Vinmonopolet API request failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return jsonResponse(response.status, {
        error: "Vinmonopolet API request failed",
        upstreamStatus: response.status,
      });
    }

    return jsonResponse(200, await parseJsonResponse(response));
  } catch (error) {
    const timedOut =
      error instanceof Error &&
      (error.name === "TimeoutError" || error.name === "AbortError");
    console.error("Vinmonopolet API request failed", {
      name: error instanceof Error ? error.name : undefined,
      message: error instanceof Error ? error.message : String(error),
    });
    return jsonResponse(timedOut ? 504 : 502, {
      error: timedOut
        ? "Wine service request timed out"
        : "Wine service is temporarily unavailable",
    });
  }
};
