import React, { useEffect, useRef, useState } from "react";
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
import "./add-wine-form.scss";
import PropTypes from "prop-types";
import { pushOrRemoveToArray } from "utils/array-utils";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { validateForm } from "components/add-wine/form-util";
import WineProduct from "../../models/product";
import index from "../../reducers";

const scrollToRef = ref => {
  window.scrollTo(0, ref.current.offsetTop);
};
// General scroll to element function
// TODO PROPSINTERFACE.

const AddWineForm: React.FunctionComponent<any> = props => {
  const errorRefMap = {
    sanderRating: useRef(null),
    ineRating: useRef(null),
    wineYear: useRef(null)
  };

  const executeErrorScroll = errors => {
    scrollToRef(errorRefMap[Object.keys(errors)[0]]);
  };

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
  const [productId, setProductId] = useState<string | null>(null);
  const [selectedWine, setSelectedWine] = useState(false);
  const [errors, setErrors] = useState<iErrors | null>(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  useEffect(() => {
    props.resetWineRegistered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSearch = () => {
    props.resetWineRegistered();
    setWineName("");
    setErrors(null);
    setSelectedWine(false);
    setSanderRating("");
    setIneRating("");
    setWineYear("");
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
    setProductId(wine.basic.productId);
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
      winePicture,
      apiId: productId
    };
    const validatedErrors: iErrors | null = validateForm(
      validationSchema,
      values
    );
    setErrors(validatedErrors);
    if (validatedErrors == null) {
      props.addWineToWineList(values, props.firebase);
    } else {
      executeErrorScroll(validatedErrors);
    }
  };
  const nameContainerWidth = selectedWine ? "add-wine-form__col-1" : "add-wine-form__row";
  return (
    <div className="add-wine">
      <h2 className="page-title">Legg til ny vin</h2>
      <form onSubmit={onSubmitForm} className="add-wine-form">
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
        </div>
        {selectedWine && (
          <div className="add-wine-form__col-2">
            <label>Type</label>
            <div className="add-wine-form__textfield wine-input">
              <p className="add-wine-form__textfield">{wineType}</p>
            </div>
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-1">
            <div className="textfield-label" ref={errorRefMap.wineYear}>
              <label htmlFor="wineYear">Årgang</label>
            </div>
            <input
              value={wineYear}
              onChange={event => setWineYear(event.target.value)}
              className="wine-input"
            />
            {errors?.wineYear && (
              <p className="add-wine-error-validation">{errors.wineYear}</p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-2">
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
          <div className="add-wine-form__col-1">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Land</label>
            </div>
            <div className="wine-input">
              <p className="add-wine-form__textfield ">{wineCountry}</p>
            </div>
            {errors?.wineCountry && (
              <p className="add-wine-error-validation">{errors.wineCountry}</p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-2">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Region</label>
            </div>
            <div className="wine-input">
              <p className="add-wine-form__textfield ">{wineRegion}</p>
            </div>
            {errors?.wineRegion && (
              <p className="add-wine-error-validation">{errors.wineRegion}</p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-1" ref={errorRefMap.sanderRating}>
            <div className="textfield-label">
              <label htmlFor="sanderRating">Rating Sander</label>{" "}
            </div>
            <input
              value={sanderRating as string}
              onChange={event => setSanderRating(event.target.value)}
              className="wine-input"
            />
            {!!errors && errors.sanderRating && (
              <div>
                <p className="add-wine-error-validation">
                  {errors.sanderRating}
                </p>
              </div>
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-2" ref={errorRefMap.ineRating}>
            <div className="textfield-label">
              <label htmlFor="ineRating">Rating Ine</label>
            </div>
            <input
              value={ineRating as string}
              onChange={event => setIneRating(event.target.value)}
              className="wine-input"
            />
            {!!errors && errors.ineRating && (
              <div>
                <p className="add-wine-error-validation">{errors.ineRating}</p>
              </div>
            )}
          </div>
        )}
        {selectedWine && (
          <>
            <div className="add-wine-form__col-1">
              <label>Hva passer vinen til?</label>
              <div className="add-wine-form__fits-to-grid">
                {imageKeys.map((imageKey, index) => (
                  <div
                    className="add-wine-form__fits-to-cell"
                    key={index + imageKey}
                  >
                    <ImageCheckbox
                      key={imageKey}
                      image={images[imageKey]}
                      htmlFor={imageKey}
                      value={imageKey}
                      name="fitsTo"
                      onChange={event =>
                        setFitsTo(
                          pushOrRemoveToArray(fitsTo, event.target.value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-2">
						<div className="textfield-label">
            <label htmlFor="winePicture">Bilde</label>
            </div>
            {winePicture && (
              <img
                src={winePicture as string}
                className="wine-picture"
                alt="wine"
              />
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__row">
            <div className="add-wine-form__buttons">
              <button
                disabled={props.wineRegistered}
                type="submit"
                className="add-wine-form__button add-wine-form__button-add"
              >
                Registrer vin
              </button>
              <button
                onClick={resetSearch}
                className="add-wine-form__button add-wine-form__button-reset"
              >
                Start på nytt
              </button>
            </div>
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
  resetWineRegistered: PropTypes.func,
  wineRegistered: PropTypes.bool,
  firebase: PropTypes.object
};

const mapStateToProps = state => ({
  wineRegistered: state.wineReducer.wineRegistered
});

export default withFirebase(
  connect(mapStateToProps, {
    addWineToWineList: dispatchers.addWineToWineList,
    resetWineRegistered: dispatchers.resetRegisteredWine
  })(AddWineForm)
);
