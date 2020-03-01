import React, { useState } from "react";
import { connect } from "react-redux";

import "./wineform.scss";
import * as dispatchers from "dispatchers";
import { SearchDropDown } from "components/search-dropdown/search-dropdown";
import { Raastoff } from "data/raastoff";
import * as images from "images";
import { imageKeys } from "images";
import { isObjectInArray, pushOrRemoveToArray } from "utils/array-utils";
import ImageCheckbox from "components/add-wine/image-checkbox/image-checkbox";
import Wine from "../../../models/wine";

interface Props {
  setWineItems: (value) => Wine[];
  allWines: Wine[];
}

// TODO TYPESCRIPT.
const WineSearchFormComponent: React.FunctionComponent<Props> = ({
  setWineItems,
  allWines
}: Props) => {
  const [wineName, setWineName] = useState("");
  const [expandedFilter, setExpandedFilter] = useState(false);
  // TODO FIX DEFAULT VALUES SO THAT PLACEHOLDER IS SHOWN.
  const [selectedWineGrapes, setSelectedWineGrapes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedFitsTo, setSelectedFitsTo] = useState([]);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  // TODO prettify to one filter-function
  const filterWines = () => {
    setWineItems(
      allWines
        .filter(wine =>
          wine.wineName.toLowerCase().includes(wineName.toLowerCase())
        )
        .filter(wine => isObjectInArray(wine.fitsTo, selectedFitsTo))
        .filter(wine => isObjectInArray(wine.wineGrapes, selectedWineGrapes))
        .filter(wine => isObjectInArray(wine.wineCountry, selectedCountries))
        .filter(wine => isObjectInArray(wine.wineRegion, selectedRegions))
    );
  };

  const onSubmit = event => {
    event.preventDefault();
    filterWines();
  };

  const onClear = event => {
    event.preventDefault();
    setSelectedFitsTo([]);
    setSelectedRegions([]);
    setSelectedWineGrapes([]);
    setSelectedCountries([]);
    setWineName("");
    setWineItems(allWines);
  };

  return (
    <div className="wine-search-form">
      <h1 className="wine-search-form__title page-title">
        Søk på lagrede viner
      </h1>
      <form className="wine-search-form__form" onSubmit={e => onSubmit(e)}>
        <div className="wine-search-form__form__row">
          <label htmlFor="wineName">Navn</label>
          <div className="wine-input-container">
            <input
              type="text"
              autoComplete="off"
              name="wineName"
              value={wineName}
              onChange={e => setWineName(e.target.value)}
            />
          </div>
        </div>
        {expandedFilter && (
          <>
            <div className="wine-search-form__form__row">
              <label>Drue</label>
              <SearchDropDown
                placeholder="Vindrue"
                searchItems={wineGrapeItems}
                selectedItems={selectedWineGrapes.map(grape => ({
                  label: grape,
                  value: grape
                }))}
                onClick={grapeArray => setSelectedWineGrapes(grapeArray)}
              />
            </div>
            <div className="wine-search-form__form__row">
              <label htmlFor="country">Land</label>
              <SearchDropDown
                placeholder="Land"
                selectedItems={selectedCountries.map(country => ({
                  label: country,
                  value: country
                }))}
                searchItems={[
                  ...new Set(allWines.map(wine => wine.wineCountry))
                ]}
                onClick={countryArray => setSelectedCountries(countryArray)}
              />
            </div>
            <div className="wine-search-form__form__row">
              <label>Region</label>
              <SearchDropDown
                placeholder="Region"
                selectedItems={selectedRegions.map(region => ({
                  label: region,
                  value: region
                }))}
                searchItems={[
                  ...new Set(
                    allWines
                      .map(wine => wine.wineRegion)
                      .filter(region => region !== null)
                  )
                ]}
                onClick={regionArray => setSelectedRegions(regionArray)}
              />
            </div>
          </>
        )}
        {expandedFilter && (
          <div className="wine-search-form__form__row">
            <label>Hva passer vinen til?</label>
            <div className="wine-search-form__form__fits-to-grid">
              {imageKeys.map(imageKey => (
                <div key={imageKey} className="fits-to-cell">
                  <ImageCheckbox
                    key={imageKey + "searchForm"}
                    image={images[imageKey]}
                    htmlFor={imageKey + "searchForm"}
                    value={imageKey}
                    name="wineSearchForm"
                    onChange={event =>
                      setSelectedFitsTo(
                        pushOrRemoveToArray(selectedFitsTo, event.target.value)
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="wine-search-form__toggle-filter">
          <button
            type="button"
            className="wine-search-form__button wine-search-form__button-toggle"
            onClick={() => {
              setExpandedFilter(!expandedFilter);
              window.scrollTo(0, 0);
            }}
          >
            {expandedFilter ? "Skjul ekstra filter" : "Vis ekstra filter"}
          </button>
        </div>
        <div className="wine-search-form__form__col-1">
          <button
            type="submit"
            className="wine-search-form__button wine-search-form__button-search"
          >
            Filtrer viner
          </button>
        </div>
        <div className="wine-search-form__form__col-2">
          <button
            type="submit"
            onClick={e => onClear(e)}
            className="wine-search-form__button wine-search-form__button-reset"
          >
            Tøm søk
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  wineItems: state.wineReducer.wineItems,
  allWines: state.wineReducer.allWines
});

// TODO TEST USESELECTOR INSTEAD
export default connect(mapStateToProps, {
  setWineItems: dispatchers.setWineItems
})(WineSearchFormComponent);
