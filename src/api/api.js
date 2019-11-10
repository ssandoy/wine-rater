import AwesomeDebouncePromise from "awesome-debounce-promise";

const vinmonopoletBaseUrl =
  "https://app.vinmonopolet.no/vmpws/v2/vmp/products/search";

export const searchProductsByName = async query => {
  const response = await fetch(
    vinmonopoletBaseUrl + `?query=${query}:sort:name`
  );
  return response.json();
};
// TODO: RENAME
export const searchProductsByNameMapToSelect = async query => {
  const response = await fetch(
    vinmonopoletBaseUrl + `?query=${query}:sort:name`
  );
  return response.json().then(result =>
    result.products.map(item => {
      return {
        value: item,
        label: item.name
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
