import React from "react";
import "./search-dropdown.scss";
import AsyncSelect from "react-select/async";
import { colourStyles } from "./styles";


export const AsyncSearchDropdown = ({
                                        // eslint-disable-next-line react/prop-types
  debouncedPromise,
                                        // eslint-disable-next-line react/prop-types
  selectedItems,
                                        // eslint-disable-next-line react/prop-types
  placeholder,
                                        // eslint-disable-next-line react/prop-types
  noOptionPlaceholder,
                                        // eslint-disable-next-line react/prop-types
  onClick,
                                        // eslint-disable-next-line react/prop-types
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
