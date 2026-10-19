import type { CSSObjectWithLabel } from "react-select";

type OptionState = {
  isSelected: boolean;
};

export const colourStyles = {
  option: (provided: CSSObjectWithLabel, state: OptionState) => ({
    ...provided,
    borderBottom: "1px solid var(--dropdown-option-color)",
    color: state.isSelected
      ? "var(--dropdown-option-selected-color)"
      : "var(--dropdown-option-color)",
  }),
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: "var(--form-input-color)",
    border: "1px solid grey",
    borderRadius: "24px",
  }),
  multiValue: (provided: CSSObjectWithLabel) => {
    const transition = "opacity 300ms";

    return {
      ...provided,
      backgroundColor: "var(--dropdown-chip-background-color)",
      transition,
    };
  },
};

export const dropdownDisabledColourStyles = {
  option: (provided: CSSObjectWithLabel, state: OptionState) => ({
    ...provided,
    borderBottom: "1px solid var(--dropdown-option-color)",
    color: state.isSelected
      ? "var(--dropdown-option-selected-color)"
      : "var(--dropdown-option-color)",
  }),
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    backgroundColor: "var(--form-input-color)",
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
      backgroundColor: "var(--dropdown-chip-background-color)",
      paddingRight: "5px",
      transition,
    };
  },
};
