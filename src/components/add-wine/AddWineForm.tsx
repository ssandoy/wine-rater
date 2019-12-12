import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";
import { withFirebase } from "firebase/index";

import { debouncedSearchProductsByNameItem, getWine } from "api/api";
import validationSchema, { iErrors } from "./validationSchema";
import * as images from "images";
import { imageKeys } from "images";
import { Raastoff } from "data/raastoff";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { SearchDropDown } from "../search-dropdown/search-dropdown";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import "./styles.scss";
import PropTypes from "prop-types";
import { pushOrRemoveToArray } from "utils/array-utils";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { validateForm } from "components/add-wine/form-util";
import WineProduct from "../../models/product";

const wineTypes = [
  { label: "Rødvin", value: "RED" },
  { label: "Hvitvin", value: "WHITE" },
  { label: "Rosé", value: "ROSÉ" },
  { label: "Musserende", value: "SPARKLING" }
];

const AddWineForm = props => {
  // TODO CALL SOMEWHERE ELSE ALSO.
  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineYear, setWineYear] = useState("");
  const [wineCountry, setWineCountry] = useState("");
  const [wineGrapes, setWineGrapes] = useState<string[]>([]);
  const [wineRegion, setWineRegion] = useState("");
  const [ineRating, setIneRating] = useState<string | null>(null);
  const [sanderRating, setSanderRating] = useState<string | null>(null);
  const [fitsTo, setFitsTo] = useState<string[]>([]);
  const [winePicture, setWinePicture] = useState<string | null>(null);
  const [selectedWine, setSelectedWine] = useState(false);
  const [errors, setErrors] = useState<iErrors | null>(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  useEffect(() => {
    props.resetWineRegistered();
  }, []);

  const resetSearch = () => {
    setWineName("");
    setSelectedWine(false);
  };

  const handleSelectedWine = wine => {
    setSelectedWine(true);
    fillFormFromWine(wine);
  };

  const fillFormFromWine = async (wine: WineProduct) => {
    const wineDetails = await getWine(wine.basic.productId);
    setWineName(wine.basic.productShortName);
    setWinePicture(
      convertVinmonopoletPictureSize(wineDetails.images[1].url, 800)
    );
    const { country, region } = wine.origins.origin;
    setWineCountry(country);
    setWineRegion(region);
    setWineYear(wine.basic.vintage);
    setWineType(wine.classification.productTypeName);
    setWineGrapes(wine.ingredients.grapes.map(grape => grape.grapeDesc));
  };

  const onSubmitForm = event => {
    event.preventDefault();
    const values = {
      wineName,
      wineType,
      wineYear,
      wineCountry,
      wineGrapes,
      wineRegion,
      sanderRating,
      ineRating,
      fitsTo,
      winePicture
    };
    const validatedErrors: iErrors | null = validateForm(
      validationSchema,
      values
    );
    setErrors(validatedErrors);
    if (validatedErrors == null) {
      props.addWineToWineList(values, props.firebase);
    }
  };
  const nameContainerWidth = selectedWine ? "col-sm-12 col-md-8" : "col-12";
  // TODO START HERE WITH REGISTRATION OUTPUT AND UPDATE STATE TO FALSE WHEN SOMETHING (NAVIGATION ETC.)
  return (
    <div className="add-wine">
      <h2 className="add-wine-title">Legg til ny vin</h2>
      <form onSubmit={onSubmitForm} className="wine-form">
        <div className="row">
          <div className={nameContainerWidth}>
            <label htmlFor="wineName">Navn</label>
            <AsyncSearchDropdown
              selectedItems={{ label: wineName, value: wineName }}
              placeholder="Tast inn navnet på vinen"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={value => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder="Fant ingen treff på dette navnet"
            />
            {!!errors && errors.wineName && (
              <p className="add-wine-error-validation">{errors.wineName}</p>
            )}
          </div>
          {selectedWine && (
            <div className="col-sm-6 col-md-4">
              <label>Type</label>
              <SearchDropDown
                isDisabled={false}
                placeholder="Velg vintype"
                searchItems={wineTypes}
                selectedItems={{ label: wineType, value: wineType }}
                isMulti={false}
                onClick={wineType => setWineType(wineType)}
              />
              {!!errors && errors.wineType && (
                <p className="add-wine-error-validation">{errors.wineType}</p>
              )}
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-6 col-md-6">
              <div className="textfield-label">
                <label htmlFor="sanderRating">Årgang</label>
              </div>
              <input
                disabled={false}
                value={wineYear}
                onChange={event => setWineYear(event.target.value)}
                className="wine-input"
              />
              {!!errors && errors.wineYear && (
                <p className="add-wine-error-validation">{errors.wineYear}</p>
              )}
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-12 col-md-6">
              <label>Drue</label>
              <SearchDropDown
                isDisabled={true}
                placeholder=""
                searchItems={wineGrapeItems}
                onClick={grapeArray => {
                  setWineGrapes(grapeArray);
                }}
                selectedItems={wineGrapes.map(grape => ({
                  label: grape,
                  value: grape
                }))}
              />
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-6 col-md-6">
              <div className="textfield-label">
                <label htmlFor="sanderRating">Land</label>
              </div>
              <input
                disabled
                value={wineCountry}
                onChange={event => setWineCountry(event.target.value)}
                className="wine-input"
              />
              {!!errors && errors.wineCountry && (
                <p className="add-wine-error-validation">
                  {errors.wineCountry}
                </p>
              )}
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-6 col-md-6">
              <div className="textfield-label">
                <label htmlFor="sanderRating">Region</label>
              </div>
              <input
                disabled
                value={wineRegion}
                onChange={event => setWineRegion(event.target.value)}
                className="wine-input"
              />
              {!!errors && errors.wineRegion && (
                <p className="add-wine-error-validation">{errors.wineRegion}</p>
              )}
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-6 col-md-6">
              <div className="textfield-label">
                <label htmlFor="sanderRating">Rating Sander</label>{" "}
              </div>
              <input
                value={sanderRating as string}
                onChange={event => setSanderRating(event.target.value)}
                className="wine-input"
              />
              {!!errors && errors.sanderRating && (
                <p className="add-wine-error-validation">
                  {errors.sanderRating}
                </p>
              )}
            </div>
          )}
          {selectedWine && (
            <div className="col-sm-6 col-md-6">
              <div className="textfield-label">
                <label htmlFor="ineRating">Rating Ine</label>
              </div>
              <input
                value={ineRating as string}
                onChange={event => setIneRating(event.target.value)}
                className="wine-input"
              />
              {!!errors && errors.ineRating && (
                <p className="add-wine-error-validation">{errors.ineRating}</p>
              )}
            </div>
          )}
        </div>
        {selectedWine && (
          <div className="form-group">
            <label>Hva passer vinen til?</label>
            <div className="row fits-to-row">
              {imageKeys.map(imageKey => (
                <ImageCheckbox
                  key={imageKey}
                  columnProps="col-4 col-md-1"
                  image={images[imageKey]}
                  htmlFor={imageKey}
                  value={imageKey}
                  name="fitsTo"
                  onChange={event =>
                    setFitsTo(pushOrRemoveToArray(fitsTo, event.target.value))
                  }
                />
              ))}
            </div>
          </div>
        )}
        {selectedWine && (
          <div className="row">
            <div className="col-12">
              <label htmlFor="winePicture">Bilde</label>
              <br />
              {winePicture && (
                <img
                  src={winePicture as string}
                  className="wine-picture"
                  alt="wine"
                />
              )}
            </div>
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__buttons">
            <button
              type="submit"
              className="add-wine-form__button add-wine-form__button-add btn btn-primary"
            >
              Registrer vin
            </button>
            <button
              onClick={resetSearch}
              className="add-wine-form__button add-wine-form__button-reset btn btn-danger"
            >
              Angre registrering
            </button>
          </div>
        )}
        {props.wineRegistered && (
          <div className="add-wine__wine-registered">
            <p>Vinen ble lagret!</p>
          </div>
        )}
      </form>
    </div>
  );
};

AddWineForm.propTypes = {
  addWineToWineList: PropTypes.func,
  firebase: PropTypes.object
};

const mapStateToProps = state => ({
  wineRegistered: state.wineRegistered
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      addWineToWineList: dispatchers.addWineToWineList,
      resetWineRegistered: dispatchers.resetRegisteredWine
    }
  )(AddWineForm)
);
