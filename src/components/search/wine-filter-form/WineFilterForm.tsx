import ImageCheckbox from "components/add-wine/image-checkbox/image-checkbox";
import { SearchDropDown } from "components/search-dropdown/search-dropdown";
import { Raastoff } from "data/raastoff";
import { imageSources, imageKeys as imgKeys } from "images";
import type React from "react";
import { useState } from "react";
import { pushOrRemoveToArray } from "utils/array-utils";
import { useAppContext } from "../../../context/AppContext";
import { useWineFilterContext } from "../../../context/filter-context/WineFilterContext";
import ExitIcon from "../../../icons/ExitIcon";
import SearchIcon from "../../../icons/SearchIcon";
import TrashIcon from "../../../icons/TrashIcon";
import { WinePriceRange } from "./WinePriceRange";
import styles from "./wineform.module.css";

type Props = {
  onFilter: () => void;
};

const WineFilterForm: React.FC<Props> = ({ onFilter }: Props) => {
  const { allWines, setFilteredWines } = useAppContext();
  const [imageKeys] = useState<string[]>(imgKeys);

  const {
    hasOpenedFilter,
    setHasOpenedFilter,
    filters: {
      wineName: { value: wineName, setValue: setWineName },
      selectedWineGrapes: {
        value: selectedWineGrapes,
        setValue: setSelectedWineGrapes,
      },
      selectedRegions: { value: selectedRegions, setValue: setSelectedRegions },
      selectedFitsTo: { value: selectedFitsTo, setValue: setSelectedFitsTo },
      selectedCountries: {
        value: selectedCountries,
        setValue: setSelectedCountries,
      },
      maxPrice: { setValue: setMaxPrice },
      minPrice: { setValue: setMinPrice },
    },
  } = useWineFilterContext();
  const wineGrapeItems = Raastoff.values.map((value) => value.code);

  const onSubmit = (event) => {
    event.preventDefault();
    onFilter();
    setHasOpenedFilter(false);
  };

  const onClear: () => void = () => {
    setSelectedFitsTo([]);
    setSelectedRegions([]);
    setSelectedWineGrapes([]);
    setSelectedCountries([]);
    setWineName("");
    setFilteredWines(allWines);
    setMaxPrice(1000);
    setMinPrice(0);
    setHasOpenedFilter(false);
  };

  return (
    <div className={styles["wine-search-form__container"]}>
      <div className={styles["wine-search-form__exit-icon"]}>
        <button
          type="button"
          className={styles["wine-search-form__exit-button"]}
          aria-label="Lukk filter"
          onClick={() => setHasOpenedFilter(!hasOpenedFilter)}
        >
          <ExitIcon />
        </button>
      </div>
      <form
        className={styles["wine-search-form"]}
        onSubmit={(e) => onSubmit(e)}
      >
        <div className={styles["wine-search-form__row"]}>
          <label className={styles.label} htmlFor="wineName">
            Navn
          </label>
          <div className="wine-input-container">
            <input
              type="text"
              autoComplete="off"
              name="wineName"
              value={wineName}
              onChange={(e) => setWineName(e.target.value)}
            />
          </div>
        </div>

        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Drue</span>
          <SearchDropDown
            placeholder="Vindrue"
            searchItems={wineGrapeItems}
            selectedItems={selectedWineGrapes.map((grape) => ({
              label: grape,
              value: grape,
            }))}
            onClick={(grapeArray) => setSelectedWineGrapes(grapeArray)}
          />
        </div>
        <div className={styles["wine-search-form__row"]}>
          <label className={styles.label} htmlFor="country">
            Land
          </label>
          <SearchDropDown
            placeholder="Land"
            selectedItems={selectedCountries.map((country) => ({
              label: country,
              value: country,
            }))}
            searchItems={[...new Set(allWines.map((wine) => wine.wineCountry))]}
            onClick={(countryArray) => setSelectedCountries(countryArray)}
          />
        </div>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Region</span>
          <SearchDropDown
            placeholder="Region"
            selectedItems={selectedRegions.map((region) => ({
              label: region,
              value: region,
            }))}
            searchItems={[
              ...new Set(
                allWines
                  .map((wine) => wine.wineRegion)
                  .filter((region) => region !== null)
              ),
            ]}
            onClick={(regionArray) => setSelectedRegions(regionArray)}
          />
        </div>

        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Hva passer vinen til?</span>
          <div className={styles["wine-search-form__fits-to-grid"]}>
            {imageKeys.map((imageKey) => {
              if (imageKey === "fish" || imageKey === "cake") {
                return null;
              }
              return (
                <div key={imageKey} className={styles["fits-to-cell"]}>
                  <ImageCheckbox
                    key={`${imageKey}searchForm`}
                    image={imageSources[imageKey]}
                    htmlFor={`${imageKey}searchForm`}
                    value={imageKey}
                    name="wineSearchForm"
                    checked={selectedFitsTo.includes(imageKey)}
                    onClick={(value) => {
                      setSelectedFitsTo(
                        pushOrRemoveToArray(selectedFitsTo, value)
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["wine-search-form__row"]}>
          <span className={styles.label}>Pris</span>
          <div className={styles["wine-search-form__range-container"]}>
            <WinePriceRange />
          </div>
        </div>
        <div className={styles["wine-search-form__buttons-container"]}>
          <button
            type="submit"
            className="wine-search-form__button"
            onClick={(event) => onSubmit(event)}
          >
            <SearchIcon />
            Søk
          </button>
          <button
            type="button"
            className="wine-search-form__button"
            onClick={() => onClear()}
          >
            <TrashIcon />
            Tøm søk
          </button>
        </div>
      </form>
    </div>
  );
};

export default WineFilterForm;
