import AwesomeDebouncePromise from "awesome-debounce-promise";
import WineProduct from "models/product";

const MAX_RESULTS = 20;
const DEBOUCE_TIME = 500;

const vinmonopoletBaseUrlV1 =
  "https://app.vinmonopolet.no/vmpws/v2/vmp/products";

// fixme return types etc.
const searchProductsByNameMapToSelect = async (
  query: string
): Promise<WineProduct[]> => {
  // The api consumes _ instead of spaces
  const trimmedQuery = query.replace(/ /g, "_");
  const response = await fetch(
    "/wine-api/api" +
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

export const getWine = async (id: string) => {
  const response = await fetch(vinmonopoletBaseUrlV1 + `/${id}`);
  return response.json();
};

export const debouncedSearchProductsByNameItem = AwesomeDebouncePromise(
  searchProductsByNameMapToSelect,
  DEBOUCE_TIME
);
