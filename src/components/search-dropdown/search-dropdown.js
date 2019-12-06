import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";

const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "#98FB98" : "#023950"
  }),
  // TODO TRY TO IMPORT FROM COLOR SCSS
  // TODO SEPARATE OUT TO COMMON FOR BOTH.
  control: styles => ({ ...styles, backgroundColor: "#f4f3f6" }),
  valueContainer: base => ({
    ...base,
    fontSize: "0.9em"
  }),
  multiValue: (provided, state) => {
    const transition = "opacity 300ms";

    return {
      ...provided,
      backgroundColor: "#add8e6",
      borderRadius: "24px",
      transition
    };
  }
};

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
      />
    </>
  );
};

// TODO DESIRED BEHAVIOUR:
// PASS DOWN KEY AND VALUE, SET TO VALUE AND LABEL. THUS ACCESS KEY ON ONCLICK.
