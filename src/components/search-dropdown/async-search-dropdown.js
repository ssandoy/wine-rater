import React from "react";
import "./search-dropdown.scss";
import AsyncSelect from "react-select/async";
import { debouncedSearchProductsByNameItem } from "api/api";

const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "#98FB98" : "#023950"
  }),
  control: styles => ({ ...styles, backgroundColor: "#e8eeef" }),
  multiValue: (provided, state) => {
    const transition = "opacity 300ms";

    return { ...provided, backgroundColor: "#add8e6", transition };
  }
};
// TODO IMPLEMENT PROMISE.
export const AsyncSearchDropdown = ({
  promiseOptions,
  placeholder,
  noOptionPlaceholder,
  onClick
}) => {
  return (
    <>
      <AsyncSelect
        placeholder={placeholder}
        onChange={opt => {
          onClick(opt.value);
        }}
        loadOptions={inputvalue =>
          debouncedSearchProductsByNameItem(inputvalue)
        }
        styles={colourStyles}
        noOptionsMessage={() => noOptionPlaceholder}
      />
    </>
  );
};

// TODO DESIRED BEHAVIOUR:
// PASS DOWN KEY AND VALUE, SET TO VALUE AND LABEL. THUS ACCESS KEY ON ONCLICK.
