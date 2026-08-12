// Pre-existing plain-JS component with no PropTypes/TS typing; unrelated to
// the Vite migration. Surfaced now only because this rename (.js -> .jsx,
// required for Vite to parse the JSX in this file) is the first time this
// file has been staged since lint-staged was set up.
/* eslint-disable react/prop-types */
import React, { useRef, useState } from "react";
import styles from "./search-dropdown.module.css";
import AsyncSelect from "react-select/async";
import { colourStyles } from "./styles";

export const AsyncSearchDropdown = ({
  debouncedPromise,
  selectedItems,
  placeholder,
  noOptionPlaceholder,
  onClick,
  setValue = null
}) => {
  const [hasRequestError, setHasRequestError] = useState(false);
  const latestRequest = useRef(0);

  const loadOptions = inputValue => {
    const requestId = ++latestRequest.current;
    setValue(inputValue);

    return debouncedPromise(inputValue)
      .then(options => {
        if (requestId === latestRequest.current) {
          setHasRequestError(false);
        }
        return options;
      })
      .catch(error => {
        console.error("Wine search failed", error);
        if (requestId === latestRequest.current) {
          setHasRequestError(true);
        }
        return [];
      });
  };

  return (
    <>
      <AsyncSelect
        placeholder={placeholder}
        value={selectedItems}
        onChange={opt => {
          if (!opt) {
            setValue("");
            return;
          }
          onClick(opt.value);
        }}
        loadingMessage={() => "Laster inn viner..."}
        isClearable={true}
        loadOptions={loadOptions}
        styles={colourStyles}
        noOptionsMessage={() => noOptionPlaceholder}
      />
      {hasRequestError && (
        <p className={styles["search-dropdown__error"]} role="alert">
          Kunne ikke hente viner. Prøv igjen.
        </p>
      )}
    </>
  );
};
