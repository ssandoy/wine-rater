import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Slider from "@material-ui/core/Slider";

import "./wineform.scss";
import * as dispatchers from "dispatchers";
import { SearchDropDown } from "components/search-dropdown/search-dropdown";
import { Raastoff } from "data/raastoff";
import * as images from "images";
import { imageKeys } from "images";
import { isObjectInArray, pushOrRemoveToArray } from "utils/array-utils";
import ImageCheckbox from "components/add-wine/image-checkbox/image-checkbox";

// TODO TYPESCRIPT.
const WineSearchFormComponent = props => {
  const [wineName, setWineName] = useState("");
  const [expandedFilter, setExpandedFilter] = useState(false);
  // TODO FIX DEFAULT VALUES SO THAT PLACEHOLDER IS SHOWN.
  const [selectedWineGrapes, setSelectedWineGrapes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedFitsTo, setSelectedFitsTo] = useState([]);
  const [sanderRating, setSanderRating] = useState(0);
  const [ineRating, setIneRating] = useState(0);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  // TODO prettify to one filter-function
  const filterWines = () => {
    props.setWines(
      props.allWines
        .filter(wine =>
          wine.wineName.toLowerCase().includes(wineName.toLowerCase())
        )
        .filter(wine => isObjectInArray(wine.fitsTo, selectedFitsTo))
        .filter(wine => isObjectInArray(wine.wineGrapes, selectedWineGrapes))
        .filter(wine => isObjectInArray(wine.wineCountry, selectedCountries))
        .filter(wine => isObjectInArray(wine.wineRegion, selectedRegions))
        .filter(
          wine =>
            wine.sanderRating >= sanderRating && wine.ineRating >= ineRating
        )
    );
  };

  const marks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => {
    return {
      value: number,
      label: number.toString()
    };
  });

  const onSubmit = event => {
    event.preventDefault();
    filterWines();
  };

  // FIXME SET SLIDER VALUES AND ALSO RENDERUPDATE THESE.
  const onClear = event => {
    event.preventDefault();
    setSelectedFitsTo([]);
    setSelectedRegions([]);
    setSelectedWineGrapes([]);
    setSelectedCountries([]);
    setWineName("");
    props.clearFilter();
  };

  return (
    <div className="searchComponent wine-search-form__container">
      <h2 className="wine-search-form__title">Søk på lagrede viner</h2>
      <form className="wine-search-form" onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="col-12">
            <label htmlFor="wineName">Navn</label>
            <input
              type="text"
              autoComplete="off"
              name="wineName"
              className="wine-input"
              value={wineName}
              onChange={e => setWineName(e.target.value)}
            />
          </div>
        </div>
        {expandedFilter && (
          <div className="row">
            <div className="col-12">
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
            <div className="col-12">
              <label htmlFor="fitsTo">Land</label>
              <SearchDropDown
                placeholder="Land"
                selectedItems={selectedCountries.map(country => ({
                  label: country,
                  value: country
                }))}
                searchItems={[
                  ...new Set(props.allWines.map(wine => wine.wineCountry))
                ]}
                onClick={countryArray => setSelectedCountries(countryArray)}
              />
            </div>
            <div className="col-12">
              <label>Region</label>
              <SearchDropDown
                placeholder="Region"
                selectedItems={selectedRegions.map(region => ({
                  label: region,
                  value: region
                }))}
                searchItems={[
                  ...new Set(
                    props.allWines
                      .map(wine => wine.wineRegion)
                      .filter(region => region !== null)
                  )
                ]}
                onClick={regionArray => setSelectedRegions(regionArray)}
              />
            </div>
            <div className="col-6">
              <label>Rating Sander</label>
              <div className="col-12 wine-search-form__slider-rating">
                <Slider
                  className="react-slider"
                  defaultValue={sanderRating}
                  getAriaValueText={value => value}
                  aria-labelledby="discrete-slider-always"
                  valueLabelDisplay="auto"
                  onChange={(event, value) => setSanderRating(value)}
                  step={0.1}
                  marks={marks}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <div className="col-6">
              <label>Rating Ine</label>
              <div className="col-12 wine-search-form__slider-rating">
                <Slider
                  className="react-slider"
                  defaultValue={ineRating}
                  getAriaValueText={value => value}
                  aria-labelledby="range-slider"
                  onChange={(event, value) => setIneRating(value)}
                  valueLabelDisplay="auto"
                  step={0.1}
                  marks={marks}
                  min={0}
                  max={10}
                />
              </div>
            </div>
          </div>
        )}
        {expandedFilter && (
          <div className="col-12">
            <label htmlFor="fitsTo">Passer til</label>
            <div className="row fits-to-row">
              {imageKeys.map(imageKey => (
                <ImageCheckbox
                  key={imageKey + "searchForm"}
                  columnProps="col-4 fits-to-cell"
                  image={images[imageKey]}
                  htmlFor={imageKey + "searchForm"}
                  value={imageKey}
                  name="fitsToSearchForm"
                  onChange={event =>
                    setSelectedFitsTo(
                      pushOrRemoveToArray(selectedFitsTo, event.target.value)
                    )
                  }
                />
              ))}
            </div>
          </div>
        )}
        <div className="wine-search-form__toggle-filter">
          <button
            type="submit"
            className="wine-search-form__button btn btn-primary"
            onClick={() => {
              setExpandedFilter(!expandedFilter);
              window.scrollTo(0, 0);
            }}
          >
            {expandedFilter ? "Skjul ekstra filter" : "Vis flere filter"}
          </button>
        </div>
        <div className="row wine-search-form__buttons">
          <div className="col-6">
            <button
              type="submit"
              className="wine-search-form__button btn btn-primary"
            >
              Filtrer viner
            </button>
          </div>
          <div className="col-6">
            <button
              type="submit"
              onClick={e => onClear(e)}
              className="wine-search-form__button btn btn-danger"
            >
              Tøm søk
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

WineSearchFormComponent.propTypes = {
  setWines: PropTypes.func,
  setAllWines: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  clearFilter: PropTypes.func,
  allWines: PropTypes.array
};

const mapStateToProps = state => ({
  wineItems: state.wineItems,
  allWines: state.allWines
});

export default connect(
  mapStateToProps,
  {
    setAllWines: dispatchers.setAllWines,
    setWines: dispatchers.setWines,
    clearFilter: dispatchers.clearFilter
  }
)(WineSearchFormComponent);
