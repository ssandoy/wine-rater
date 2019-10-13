import React from "react";
export const SearchDropDown = ({ searchItems }) => {
  return (
    <div>
      <select>
        {searchItems.map(item => (
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
    </div>
  );
};
