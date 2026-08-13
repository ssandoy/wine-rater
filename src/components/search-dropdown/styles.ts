import type { CSSObjectWithLabel } from "react-select";

type OptionState = {
  isSelected: boolean;
};

export const colourStyles = {
  option: (provided: CSSObjectWithLabel, state: OptionState) => ({
    ...provided,
    borderBottom: "1px solid #023950",
    color: state.isSelected ? "#98FB98" : "#023950",
  }),
  // TODO ATTEMPT TO IMPORT FROM COLOR SCSS
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: "#f4f3f6",
    border: "1px solid grey",
    borderRadius: "24px",
  }),
  multiValue: (provided: CSSObjectWithLabel) => {
    const transition = "opacity 300ms";

    return { ...provided, backgroundColor: "#add8e6", transition };
  },
};

export const dropdownDisabledColourStyles = {
  option: (provided: CSSObjectWithLabel, state: OptionState) => ({
    ...provided,
    borderBottom: "1px solid #023950",
    color: state.isSelected ? "#98FB98" : "#023950",
  }),
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: "#f4f3f6",
    border: "1px solid grey",
    borderRadius: "24px",
  }),
  multiValueRemove: (base: CSSObjectWithLabel) => ({
    ...base,
    display: "none",
  }),
  indicatorsContainer: (base: CSSObjectWithLabel) => ({
    ...base,
    display: "none",
  }),
  multiValue: (provided: CSSObjectWithLabel) => {
    const transition = "opacity 300ms";
    return {
      ...provided,
      backgroundColor: "#add8e6",
      paddingRight: "5px",
      transition,
    };
  },
};
