import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";
import { colourStyles, dropdownDisabledColourStyles } from "./styles";

export const SearchDropDown = ({
  searchItems,
  selectedItems,
  placeholder,
  onClick,
  isDisabled = false,
  isMulti = true
}) => {
  return (
    <>
      <Select
        isDisabled={isDisabled}
        className="react-select"
        placeholder={placeholder}
        options={searchItems.map(item =>
          item.label && item.value
            ? {
                label: item.label,
                value: item.value
              }
            : {
                label: item,
                value: item
              }
        )}
        onChange={opt => {
          isMulti
            ? onClick(opt ? opt.map(opt => opt.value) : [])
            : onClick(opt.value);
        }}
        value={selectedItems}
        styles={isDisabled ? dropdownDisabledColourStyles : colourStyles}
        isMulti={isMulti}
        noOptionsMessage={() => "Fant ingen treff."}
      />
    </>
  );
};
