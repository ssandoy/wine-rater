import AwesomeDebouncePromise from "awesome-debounce-promise";
import WineProduct from "models/product";
const vinmonopoletBaseUrl = "https://apis.vinmonopolet.no/";

const productsUri = vinmonopoletBaseUrl + "products/v0/details-normal";

const apiSubscriptionKey = process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_KEY;

const vinmonopoletBaseUrlV1 =
  "https://app.vinmonopolet.no/vmpws/v2/vmp/products/search";

// TODO: CONSIDER EXPRESS APP IN FRONT TO SERVE AND HIDE HEADERS.
// TODO: MERGE THESE FUNCTIONS.. THIS IS CURRENTLY NOT USED.
// TODO SET SIZE.
export const searchProductsByName = async (query: string) => {
  const response = await fetch(
    productsUri + `?productShortNameContains=${query}&start=100`,
    {
      method: "GET",
      headers: {
        // TODO: ENV BEFORE PUSH.
        Accept: "application/json",
        "Ocp-Apim-Subscription-Key": <string>apiSubscriptionKey
      }
    }
  );
  return response.json();
};
// TODO: RENAME
export const searchProductsByNameMapToSelect = async (query: string) => {
  console.log(apiSubscriptionKey);
  const response = await fetch(
    productsUri + `?productShortNameContains=${query}&start=100`,
    {
      method: "GET",
      headers: {
        // TODO: ENV BEFORE PUSH.
        Accept: "application/json",
        "Ocp-Apim-Subscription-Key": <string>apiSubscriptionKey
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

export const debouncedSearchProductsByName = AwesomeDebouncePromise(
  searchProductsByName,
  500
);

export const debouncedSearchProductsByNameItem = AwesomeDebouncePromise(
  searchProductsByNameMapToSelect,
  500
);
