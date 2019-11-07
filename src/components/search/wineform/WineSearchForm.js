import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./wineform.scss";
import * as dispatchers from "../../../dispatchers";
import { SearchDropDown } from "../../../components/add-wine/search-dropdown/search-dropdown";
import { Raastoff } from "../../../data/raastoff";
import { imageKeys } from "../../../images";
import { isObjectInArray } from "../../..//utils/array-utils";
// FIXME: RELATIVE IMPORTS INSTEAD.

// TODO CHANGE TO TYPESCRIPT.
const WineSearchFormComponent = props => {
  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("");
  // TODO FIX DEFAULT VALUES SO THAT PLACEHOLDER IS SHOWN.
  const [wineFromYear, setWineFromYear] = useState(1980);
  const [wineToYear, setWineToYear] = useState(2020);
  const [selectedWineGrapes, setSelectedWineGrapes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedFitsTo, setSelectedFitsTo] = useState([]);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  // TODO prettify?
  const filterWines = () => {
    props.setWines(
      props.allWines
        .filter(wine =>
          wine.name.toLowerCase().includes(wineName.toLowerCase())
        )
        .filter(wine =>
          wine.type.toLowerCase().includes(wineType.toLowerCase())
        )
        .filter(wine => wine.year >= wineFromYear && wine.year <= wineToYear)
        .filter(wine => isObjectInArray(wine.fitsTo, selectedFitsTo))
        .filter(wine => isObjectInArray(wine.grapes, selectedWineGrapes))
        .filter(wine => isObjectInArray(wine.country, selectedCountries))
        .filter(wine => isObjectInArray(wine.region, selectedRegions))
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
    setWineFromYear(1980);
    setWineToYear(2020);
    setWineName("");
    props.clearWines();
  };

  return (
    <div className="wine-form">
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="wineName">Navn</label>
              <input
                type="text"
                autoComplete="off"
                name="wineName"
                className="form-control"
                value={wineName}
                onChange={e => setWineName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="wineType">Type</label>
              <select
                className="custom-select custom-select-xl-1 mb-1"
                name="wineType"
                onChange={e => setWineType(e.target.value)}
              >
                <option value="RED">Rød</option>
                <option value="WHITE">Hvit</option>
                <option value="ROSÉ">Rosé</option>
                <option value="SPARKLING">Musserende</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="wineYearLabel">
            <label htmlFor="wineYear">Årgang</label>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="number"
                name="quantity"
                min="1980"
                max="2021"
                title="fromYear"
                className="form-control"
                placeholder="Fra"
                value={wineFromYear}
                onChange={e => setWineFromYear(e.target.value)}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                name="quantity"
                min="1980"
                max="2021"
                title="toYear"
                className="form-control"
                placeholder="Til"
                value={wineToYear}
                onChange={e => setWineToYear(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="fitsTo">Passer til</label>
              <SearchDropDown
                placeholder="Type rett"
                searchItems={imageKeys}
                selectedItems={selectedFitsTo}
                onClick={fitsToArray => {
                  setSelectedFitsTo(fitsToArray);
                }}
              />
            </div>
            <div className="col-6">
              <label>Drue</label>
              <SearchDropDown
                placeholder="Vindrue"
                searchItems={wineGrapeItems}
                selectedItems={selectedWineGrapes}
                onClick={grapeArray => setSelectedWineGrapes(grapeArray)}
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-6">
              <label htmlFor="fitsTo">Land</label>
              <SearchDropDown
                placeholder="Land"
                selectedItems={selectedCountries}
                searchItems={[
                  ...new Set(props.allWines.map(wine => wine.country))
                ]}
                onClick={countryArray => setSelectedCountries(countryArray)}
              />
            </div>
            <div className="col-6">
              <label>Region</label>
              <SearchDropDown
                placeholder="Region"
                selectedItems={selectedRegions}
                searchItems={[
                  ...new Set(
                    props.allWines
                      .map(wine => wine.region)
                      .filter(region => region !== null)
                  )
                ]}
                onClick={regionArray => setSelectedRegions(regionArray)}
              />
            </div>
          </div>
        </div>
        <div className="wine-search-buttons">
          <button type="submit" className="wine-search-button btn btn-primary">
            Filtrer viner
          </button>
          <button
            type="submit"
            onClick={e => onClear(e)}
            className="wine-search-button btn btn-danger"
          >
            Tøm søk
          </button>
        </div>
      </form>
    </div>
  );
};

WineSearchFormComponent.propTypes = {
  setWines: PropTypes.func,
  setAllWines: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  clearWines: PropTypes.func,
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
    clearWines: dispatchers.clearWines
  }
)(WineSearchFormComponent);
