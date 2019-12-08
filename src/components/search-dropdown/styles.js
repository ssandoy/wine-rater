export const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted black",
    color: state.isSelected ? "#98FB98" : "#023950"
  }),
  // TODO ATTEMPT TO IMPORT FROM COLOR SCSS
  control: styles => ({
    ...styles,
    backgroundColor: "#f4f3f6",
    border: "1px solid grey",
    borderRadius: "24px"
  }),
  multiValue: (provided, state) => {
    const transition = "opacity 300ms";

    return { ...provided, backgroundColor: "#add8e6", transition };
  }
};
