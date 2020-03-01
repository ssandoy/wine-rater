import React, { useState } from "react";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { debouncedSearchProductsByNameItem } from "api/api";
import "./lookup.scss";
import WineProduct from "models/product";
import WineDetailsComponent from "./wine-details/WineDetailsComponent";

const LookUpComponent = () => {
  const [wineName] = useState("");
  const [wineProduct, setWineProduct] = useState<WineProduct | null>(null);

  const handleSelectedWine = (value: WineProduct | null) => {
    return setWineProduct(value);
  };

  return (
    <div className="lookup-container">
      <h1 className="page-title ">Vindetaljer</h1>
      <div className="lookup-details-container">
        {!wineProduct && (
          <div>
            <label htmlFor="wineName">Søk opp en vin</label>
            <AsyncSearchDropdown
              // FIXME.
              selectedItems={{ label: wineName, value: wineName }}
              placeholder="Tast inn navnet på vinen"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={value => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder="Fant ingen treff på dette navnet"
            />
          </div>
        )}
        {wineProduct && (
          <div className="wine-details-component">
            <WineDetailsComponent wineProduct={wineProduct} />{" "}
            <button
              className="lookup__button"
              onClick={() => handleSelectedWine(null)}
            >
              Søk på nytt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LookUpComponent;
