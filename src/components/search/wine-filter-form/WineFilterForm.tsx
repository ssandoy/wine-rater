import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./wineform.scss";
import * as dispatchers from "dispatchers";
import { SearchDropDown } from "components/search-dropdown/search-dropdown";
import { Raastoff } from "data/raastoff";
import * as images from "images";
import { imageKeys as imgKeys } from "images";
import { allWines as wines } from "../../../selectors/wine-selectors";
import { pushOrRemoveToArray } from "utils/array-utils";
import ImageCheckbox from "components/add-wine/image-checkbox/image-checkbox";
import { useWineFilterContext } from "../../../context/filter-context/WineFilterContext";
import ExitIcon from "../../../icons/ExitIcon";
import TrashIcon from "../../../icons/TrashIcon";
import SearchIcon from "../../../icons/SearchIcon";

type Props = {
  onFilter: () => void;
};
const WineFilterForm: React.FC<Props> = ({ onFilter }: Props) => {
  const allWines = useSelector(wines);
  const [imageKeys] = useState<string[]>(imgKeys);

  const dispatch = useDispatch();
  const {
    hasOpenedFilter,
    setHasOpenedFilter,
    filters: {
      wineName: { value: wineName, setValue: setWineName },
      selectedWineGrapes: {
        value: selectedWineGrapes,
        setValue: setSelectedWineGrapes
      },
      selectedRegions: { value: selectedRegions, setValue: setSelectedRegions },
      selectedFitsTo: { value: selectedFitsTo, setValue: setSelectedFitsTo },
      selectedCountries: {
        value: selectedCountries,
        setValue: setSelectedCountries
      }
    }
  } = useWineFilterContext();
  const wineGrapeItems = Raastoff.values.map(value => value.code);

  const onSubmit = event => {
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
    dispatch(dispatchers.setWineItems(allWines));
    setHasOpenedFilter(false);
  };

  return (
    <div className="wine-search-form__container">
      <div className="wine-search-form__exit-icon">
        <ExitIcon onClick={() => setHasOpenedFilter(!hasOpenedFilter)} />
      </div>
      <form className="wine-search-form" onSubmit={e => onSubmit(e)}>
        <div className="wine-search-form__row">
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
        {
          <>
            <div className="wine-search-form__row">
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
            <div className="wine-search-form__row">
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
            <div className="wine-search-form__row">
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
        }
        {
          <div className="wine-search-form__row">
            <label>Hva passer vinen til?</label>
            <div className="wine-search-form__fits-to-grid">
              {imageKeys.map(imageKey => (
                <div key={imageKey} className="fits-to-cell">
                  <ImageCheckbox
                    key={imageKey + "searchForm"}
                    image={images[imageKey]}
                    htmlFor={imageKey + "searchForm"}
                    value={imageKey}
                    name="wineSearchForm"
                    checked={selectedFitsTo.includes(imageKey)}
                    onClick={value => {
                      setSelectedFitsTo(
                        pushOrRemoveToArray(selectedFitsTo, value)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        }
        <div className="wine-search-form__buttons-container">
          <div
            className="wine-search-form__button"
            onClick={event => onSubmit(event)}
          >
            <SearchIcon />
            Søk
          </div>
          <div className="wine-search-form__button" onClick={() => onClear()}>
            <TrashIcon />
            Tøm søk
          </div>
        </div>
      </form>
    </div>
  );
};

export default WineFilterForm;
