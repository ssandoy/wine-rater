import { debouncedSearchProductsByNameItem } from "api";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import type WineProduct from "models/product";
import { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import styles from "./lookup.module.css";
import WineDetailsComponent from "./wine-details/WineDetailsComponent";

const LookUpComponent = () => {
  const [wineName, setWineName] = useState("");
  const [wineProduct, setWineProduct] = useState<WineProduct | null>(null);

  const handleSelectedWine = (value: WineProduct | null) => {
    return setWineProduct(value);
  };

  let noOptionText = "Tast inn navnet på vinen";
  if (wineName) {
    noOptionText = "Fant ingen treff på dette navnet";
  }

  return (
    <div className={styles["lookup-container"]}>
      <h1 className="page-title ">Vindetaljer</h1>
      <div className={styles["lookup-details-container"]}>
        {!wineProduct && (
          <div>
            <label htmlFor="wineName">Søk opp en vin</label>
            <AsyncSearchDropdown
              selectedItems={{ label: wineName, value: wineName }}
              placeholder="Tast inn navnet på vinen"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={(value) => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder={noOptionText}
              setValue={setWineName}
            />
          </div>
        )}
        {wineProduct && (
          <div className={styles["wine-details-component"]}>
            <WineDetailsComponent wineProduct={wineProduct} />{" "}
            <button
              type="button"
              className="wine-search-form__button"
              onClick={() => handleSelectedWine(null)}
            >
              <SearchIcon />
              Søk på nytt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LookUpComponent;
