import AwesomeDebouncePromise from "awesome-debounce-promise";
import WineProduct from "models/product";
const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no/";

const productsUri = vinmonopoletBaseUrl + "products/v0/details-normal";
const MAX_RESULTS = 20;
const DEBOUCE_TIME = 500;

const apiSubscriptionKey = process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY;

const vinmonopoletBaseUrlV1 =
  "https://app.vinmonopolet.no/vmpws/v2/vmp/products";

// TODO: CONSIDER EXPRESS APP IN FRONT TO SERVE AND HIDE HEADERS.
export const searchProductsByNameMapToSelect = async (query: string) => {
  // The api consumes _ instead of spaces
  const trimmedQuery = query.replace(/ /g, "_");
  const response = await fetch(
    productsUri +
      `?productShortNameContains=${trimmedQuery}&maxResults=${MAX_RESULTS}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Ocp-Apim-Subscription-Key": apiSubscriptionKey as string
      }
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
