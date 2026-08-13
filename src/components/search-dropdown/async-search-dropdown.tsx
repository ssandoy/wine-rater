import type WineProduct from "models/product";
import { type Dispatch, type SetStateAction, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import styles from "./search-dropdown.module.css";
import { colourStyles } from "./styles";

type WineSearchOption = {
  label: string;
  value: WineProduct | string;
};

type Props = {
  debouncedPromise: (inputValue: string) => Promise<WineSearchOption[]>;
  selectedItems: WineSearchOption;
  placeholder: string;
  noOptionPlaceholder: string;
  onClick: (value: WineProduct) => void;
  setValue: Dispatch<SetStateAction<string>>;
};

export const AsyncSearchDropdown = ({
  debouncedPromise,
  selectedItems,
  placeholder,
  noOptionPlaceholder,
  onClick,
  setValue,
}: Props) => {
  const [hasRequestError, setHasRequestError] = useState(false);
  const latestRequest = useRef(0);

  const loadOptions = (inputValue: string): Promise<WineSearchOption[]> => {
    const requestId = ++latestRequest.current;
    setValue(inputValue);

    return debouncedPromise(inputValue)
      .then((options) => {
        if (requestId === latestRequest.current) {
          setHasRequestError(false);
        }
        return options;
      })
      .catch((error: unknown) => {
        console.error("Wine search failed", error);
        if (requestId === latestRequest.current) {
          setHasRequestError(true);
        }
        return [];
      });
  };

  return (
    <>
      <AsyncSelect<WineSearchOption, false>
        placeholder={placeholder}
        value={selectedItems}
        onChange={(opt) => {
          if (!opt) {
            setValue("");
            return;
          }
          if (typeof opt.value !== "string") {
            onClick(opt.value);
          }
        }}
        loadingMessage={() => "Laster inn viner..."}
        isClearable={true}
        loadOptions={loadOptions}
        styles={colourStyles}
        noOptionsMessage={() => noOptionPlaceholder}
      />
      {hasRequestError && (
        <p className={styles["search-dropdown__error"]} role="alert">
          Kunne ikke hente viner. Prøv igjen.
        </p>
      )}
    </>
  );
};
