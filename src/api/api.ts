import AwesomeDebouncePromise from "awesome-debounce-promise";
import WineProduct from "models/product";

const MAX_RESULTS = 20;
export const MAX_RECOMMENDED_RESULTS = 500;
const DEBOUCE_TIME = 500;

const API_ENDPOINT = "/wine-api/api";
// fixme return types etc.
const searchProductsByNameMapToSelect = async (
  query: string
): Promise<WineProduct[]> => {
  // The api consumes _ instead of spaces
  const trimmedQuery = query.replace(/ /g, "_");
  const response = await fetch(
    API_ENDPOINT +
      `?productShortNameContains=${trimmedQuery}&maxResults=${MAX_RESULTS}`,
    {
      method: "GET"
    }
  );
  return response.json().then(result =>
    result.map((item: WineProduct) => {
      return {
        value: item,
        label: item.basic.productShortName + " " + item.basic.vintage
      };
    })
  );
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
  return encodeURIComponent(
    `foodId*${recommendedFood.foodId}*foodDesc*${foodDescriptionTrimmedQuery}`
  );
};

export const fetchWineByRecommendedFood = async (
  recommendedFood: RecommendedFood
): Promise<WineProduct[]> => {
  // fixme
  const recommendedFoodURI = buildRecommendedFoodURI(recommendedFood);
  const response = await fetch(
    API_ENDPOINT +
      `?freeText=${recommendedFoodURI}&maxResults=${MAX_RECOMMENDED_RESULTS}`,
    {
      method: "GET"
    }
  );
  // fixme how to randomize?
  return response.json();
};

export const getWine = async (id: string) => {
  const response = await fetch(API_ENDPOINT + `?productId=${id}`);
  return response.json();
};

export const getWineImage = async (id: string) => {
    const response = await fetch(`https://bilder.vinmonopolet.no/cache/1200x1200-0/${id}-1.jpg`);
    return response.json();
}

export const debouncedSearchProductsByNameItem = AwesomeDebouncePromise(
  searchProductsByNameMapToSelect,
  DEBOUCE_TIME
);
