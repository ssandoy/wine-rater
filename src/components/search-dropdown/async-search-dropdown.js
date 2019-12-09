import React from "react";
import "./search-dropdown.scss";
import AsyncSelect from "react-select/async";
import { colourStyles } from "./styles";

export const AsyncSearchDropdown = ({
  debouncedPromise,
  selectedItems,
  placeholder,
  noOptionPlaceholder,
  onClick
}) => {
  return (
    <>
      <AsyncSelect
        placeholder={placeholder}
        value={selectedItems}
        onChange={opt => {
          onClick(opt.value);
        }}
        loadingMessage={() => "Laster inn viner..."}
        loadOptions={inputvalue => debouncedPromise(inputvalue)}
        styles={colourStyles}
        noOptionsMessage={() => noOptionPlaceholder}
      />
    </>
  );
};

// TODO DESIRED BEHAVIOUR:
// PASS DOWN KEY AND VALUE, SET TO VALUE AND LABEL. THUS ACCESS KEY ON ONCLICK.
