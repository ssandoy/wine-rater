import React from "react";
import "./search-dropdown.scss";
import Select from "react-select";

export const SearchDropDown = ({ searchItems, onClick }) => {
  return (
    <div class="dropdown_container">
      <Select
        className="search-dropdown__select"
        options={searchItems.map(item => ({
          label: item.name,
          value: item.name,
        }))}
        onChange={opt =>
          onClick(searchItems.find(item => item.name === opt.value))
        }
      ></Select>
    </div>
  );
};
