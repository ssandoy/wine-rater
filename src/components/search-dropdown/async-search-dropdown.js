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
