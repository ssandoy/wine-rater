import React from "react";
import WineFilterForm from "./wine-filter-form/WineFilterForm";
import WineList from "./winelist/WineList";
import "./winesearch.scss";
import FilterIcon from "../../icons/FilterIcon";
import { isNative as nativeCheck } from "../../utils/window-utils";
import {
  useWineFilterContext,
  WineType
} from "../../context/filter-context/WineFilterContext";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { isObjectInArray } from "../../utils/array-utils";
import { useAppContext } from "../../context/AppContext";

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
      minPrice: { value: minPrice }
    }
  } = useWineFilterContext();

  const handleChange = event => {
    setWineFilterType(event.target.value);
    filterWines(event.target.value);
  };

  const filterWines = (wineType?: WineType) => {
    setFilteredWines(
      allWines
        .filter(wine =>
          wine.wineName.toLowerCase().includes(wineName.toLowerCase())
        )
        .filter(wine => isObjectInArray(wine.fitsTo, selectedFitsTo))
        .filter(wine => isObjectInArray(wine.wineGrapes, selectedWineGrapes))
        .filter(wine => isObjectInArray(wine.wineCountry, selectedCountries))
        .filter(wine => isObjectInArray(wine.wineRegion, selectedRegions))
        .filter(wine => {
          if (wineType === "alle" || wineType === undefined) {
            return true;
          } else return wine.wineType === wineType;
        })
        .filter(wine => (wine.price ?? 0) <= maxPrice)
        .filter(wine => (!wine.price ? true : wine.price >= minPrice))
    );
  };
  return (
    <div className="wine-search__container">
      <div className="wine-search__filter-bar">
        <h1 className="page-title wine-search__title">Lagrede viner</h1>
        <div
          className="wine-search__filter-icon"
          onClick={() => setHasOpenedFilter(!hasOpenedFilter)}
        >
          <FilterIcon height="30" width="30" />
          <p className="wine-search__paragraph">Filter</p>
        </div>
      </div>
      <div className="wine-list__filter-container">
        <label>Filtrer på type</label>
        <RadioGroup
          aria-label="filter wines"
          name="filterWines"
          value={wineType}
          onChange={handleChange}
          className="wine-list__radio-group"
        >
          <div className="wine-list__radio-group-children">
            <FormControlLabel
              value="alle"
              control={<Radio color="primary" />}
              label="Alle"
            />
            <FormControlLabel
              value="Rødvin"
              control={<Radio color="primary" />}
              label="Rød"
            />
            <FormControlLabel
              value="Hvitvin"
              control={<Radio color="primary" />}
              label="Hvit"
            />
          </div>
        </RadioGroup>
      </div>
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
