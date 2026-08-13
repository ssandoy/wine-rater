import type React from "react";
import { useAppContext } from "../../context/AppContext";
import {
  useWineFilterContext,
  type WineType,
} from "../../context/filter-context/WineFilterContext";
import FilterIcon from "../../icons/FilterIcon";
import { isObjectInArray } from "../../utils/array-utils";
import { isNative as nativeCheck } from "../../utils/window-utils";
import WineFilterForm from "./wine-filter-form/WineFilterForm";
import WineList from "./winelist/WineList";
import winelistStyles from "./winelist/winelist.module.css";
import styles from "./winesearch.module.css";

const WINE_TYPE_OPTIONS: Array<{ label: string; value: WineType }> = [
  { label: "Alle", value: "alle" },
  { label: "Rød", value: "Rødvin" },
  { label: "Hvit", value: "Hvitvin" },
];

const WineSearch = () => {
  const isNative = nativeCheck();
  const { allWines, setFilteredWines } = useAppContext();
  const {
    hasOpenedFilter,
    setHasOpenedFilter,
    filters: {
      wineType: { value: wineType, setValue: setWineFilterType },
      wineName: { value: wineName },
      selectedWineGrapes: { value: selectedWineGrapes },
      selectedRegions: { value: selectedRegions },
      selectedFitsTo: { value: selectedFitsTo },
      selectedCountries: { value: selectedCountries },
      maxPrice: { value: maxPrice },
      minPrice: { value: minPrice },
    },
  } = useWineFilterContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextWineType = event.target.value as WineType;
    setWineFilterType(nextWineType);
    filterWines(nextWineType);
  };

  const filterWines = (wineType?: WineType) => {
    setFilteredWines(
      allWines
        .filter((wine) =>
          wine.wineName.toLowerCase().includes(wineName.toLowerCase())
        )
        .filter((wine) => isObjectInArray(wine.fitsTo, selectedFitsTo))
        .filter((wine) => isObjectInArray(wine.wineGrapes, selectedWineGrapes))
        .filter((wine) => isObjectInArray(wine.wineCountry, selectedCountries))
        .filter((wine) => isObjectInArray(wine.wineRegion, selectedRegions))
        .filter((wine) => {
          if (wineType === "alle" || wineType === undefined) {
            return true;
          } else return wine.wineType === wineType;
        })
        .filter((wine) => (wine.price ?? 0) <= maxPrice)
        .filter((wine) => (!wine.price ? true : wine.price >= minPrice))
    );
  };
  return (
    <div className={styles["wine-search__container"]}>
      <div className={styles["wine-search__filter-bar"]}>
        <h1 className={`page-title ${styles["wine-search__title"]}`}>
          Lagrede viner
        </h1>
        <button
          type="button"
          className={styles["wine-search__filter-icon"]}
          onClick={() => setHasOpenedFilter(!hasOpenedFilter)}
          aria-expanded={hasOpenedFilter}
        >
          <FilterIcon height="30" width="30" />
          <p className={styles["wine-search__paragraph"]}>Filter</p>
        </button>
      </div>
      <fieldset className={winelistStyles["wine-list__filter-container"]}>
        <legend>Filtrer på type</legend>
        <div className={winelistStyles["wine-list__radio-group"]}>
          <div className={winelistStyles["wine-list__radio-group-children"]}>
            {WINE_TYPE_OPTIONS.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="filterWines"
                  value={option.value}
                  checked={wineType === option.value}
                  onChange={handleChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </fieldset>
      {hasOpenedFilter && isNative && (
        <WineFilterForm onFilter={() => filterWines()} />
      )}
      {!hasOpenedFilter && isNative && <WineList />}
      {!isNative && (
        <>
          {hasOpenedFilter && <WineFilterForm onFilter={() => filterWines()} />}
          <WineList />
        </>
      )}
    </div>
  );
};

export default WineSearch;
