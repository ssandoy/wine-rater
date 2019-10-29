import AwesomeDebouncePromise from "awesome-debounce-promise";

const vinmonopoletBaseUrl =
  "https://app.vinmonopolet.no/vmpws/v2/vmp/products/search";

const baseQueryParams = {
  fields: "FULL",
  currentPage: 0,
  pageSize: 50,
  query: "",
};

const fields = ["mainCategory"];

export const searchProductsByName = async query => {
  const response = await fetch(
    vinmonopoletBaseUrl + `?query=${query}:sort:name`
  );
  return response.json();
};

export const debouncedSearchProductsByName = AwesomeDebouncePromise(
  searchProductsByName,
  500
);
