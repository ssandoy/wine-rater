// Pre-existing plain-JS component with no PropTypes/TS typing; unrelated to
// the Vite migration. Surfaced now only because this rename (.js -> .jsx,
// required for Vite to parse the JSX in this file) is the first time this
// file has been staged since lint-staged was set up.
/* eslint-disable react/prop-types */
import React from "react";
import "./search-dropdown.scss";
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
        loadOptions={inputvalue => {
          setValue(inputvalue);
          return debouncedPromise(inputvalue);
        }}
        styles={colourStyles}
        noOptionsMessage={() => noOptionPlaceholder}
      />
    </>
  );
};
