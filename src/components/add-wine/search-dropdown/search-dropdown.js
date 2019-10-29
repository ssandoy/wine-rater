import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "#e8eeef" }),
};

export const SearchDropDown = ({ searchItems, placeholder, onClick }) => {
  return (
    <React.Fragment>
      <Select
        placeholder={placeholder}
        options={searchItems.map(item => ({
          label: item,
          value: item,
        }))}
        onChange={opt =>
          onClick(searchItems.find(item => item.name === opt.value))
        }
        styles={colourStyles}
      ></Select>
    </React.Fragment>
  );
};
