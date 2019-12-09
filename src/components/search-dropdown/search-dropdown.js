import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";
import { colourStyles } from "./styles";

export const SearchDropDown = ({
  searchItems,
  selectedItems,
  placeholder,
  onClick,
  isMulti = true
}) => {
  return (
    <>
      <Select
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
        styles={colourStyles}
        isMulti={isMulti}
        noOptionsMessage={() => "Fant ingen treff."}
      />
    </>
  );
};

// TODO DESIRED BEHAVIOUR:
// PASS DOWN KEY AND VALUE, SET TO VALUE AND LABEL. THUS ACCESS KEY ON ONCLICK.
