import Select, { type MultiValue } from "react-select";
import { colourStyles, dropdownDisabledColourStyles } from "./styles";

type SearchOption = {
  label: string;
  value: string;
};

type Props = {
  searchItems: Array<string | SearchOption>;
  selectedItems: SearchOption[];
  placeholder: string;
  onClick: (values: string[]) => void;
  isDisabled?: boolean;
};

export const SearchDropDown = ({
  searchItems,
  selectedItems,
  placeholder,
  onClick,
  isDisabled = false,
}: Props) => {
  return (
    <Select<SearchOption, true>
      isDisabled={isDisabled}
      className="react-select"
      placeholder={placeholder}
      options={searchItems.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item
      )}
      onChange={(options: MultiValue<SearchOption>) =>
        onClick(options.map((option) => option.value))
      }
      value={selectedItems}
      styles={isDisabled ? dropdownDisabledColourStyles : colourStyles}
      isMulti={true}
      noOptionsMessage={() => "Fant ingen treff."}
    />
  );
};
