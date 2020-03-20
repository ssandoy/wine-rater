import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";

import { debouncedSearchProductsByNameItem, getWine } from "api/api";
import validationSchema, { iErrors } from "./validationSchema";
import * as images from "images";
import { imageKeys } from "images";
import { Raastoff } from "data/raastoff";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { SearchDropDown } from "../search-dropdown/search-dropdown";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import "./add-wine-form.scss";
import { pushOrRemoveToArray } from "utils/array-utils";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { validateForm } from "components/add-wine/form-util";
import Wine from "../../models/wine";
import WineProduct from "../../models/product";
import { withFirebase } from "firebase/index";

const scrollToRef = ref => {
  window.scrollTo(0, ref.current.offsetTop);
};
// General scroll to element function

interface Props {
  wineRegistered: boolean;
  resetWineRegistered: () => void;
  addWineToWineList: (Wine: Wine, firebase: any) => void;
  firebase: any;
}

const AddWineForm = ({
  wineRegistered,
  resetWineRegistered,
  addWineToWineList,
  firebase
}: Props) => {
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
  const [wineYear, setWineYear] = useState<number>(0);
  const [wineCountry, setWineCountry] = useState("");
  const [wineGrapes, setWineGrapes] = useState<string[]>([]);
  const [wineRegion, setWineRegion] = useState("");
  const [ineRating, setIneRating] = useState<string>("");
  const [sanderRating, setSanderRating] = useState<string>("");
  const [fitsTo, setFitsTo] = useState<string[]>([]);
  const [winePicture, setWinePicture] = useState<string | undefined>(undefined);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [selectedWine, setSelectedWine] = useState(false);
  const [errors, setErrors] = useState<iErrors | null>(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  useEffect(() => {
    resetWineRegistered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetSearch = () => {
    resetWineRegistered();
    setWineName("");
    setErrors(null);
    setSelectedWine(false);
    setSanderRating("");
    setIneRating("");
    setWineYear(0);
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
    setWineYear(Number(wine.basic.vintage));
    setWineType(wine.classification.productTypeName);
    setWineGrapes(wine.ingredients.grapes.map(grape => grape.grapeDesc));
    setProductId(wine.basic.productId);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    const sRating = parseInt(sanderRating);
    const iRating = parseInt(ineRating);
    const values: Wine = {
      wineName,
      wineType,
      wineYear,
      wineCountry,
      wineGrapes,
      wineRegion,
      ineRating: iRating,
      sanderRating: sRating,
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
      addWineToWineList(values, firebase);
    } else {
      executeErrorScroll(validatedErrors);
    }
  };
  const nameContainerWidth = selectedWine
    ? "add-wine-form__col-1"
    : "add-wine-form__row";
  return (
    <div className="add-wine">
      <h1 className="page-title">Legg til ny vin</h1>
      <form onSubmit={onSubmitForm} className="add-wine-form">
        <div className={nameContainerWidth}>
          <div className="textfield-label">
            <label htmlFor="wineName">Navn</label>
          </div>
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
            <div className="textfield-label">
              <label>Type</label>
            </div>
            <div className="wine-input-container">
              <p className="add-wine-form__textfield">{wineType}</p>
            </div>
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-1">
            <div className="textfield-label" ref={errorRefMap.wineYear}>
              <label htmlFor="wineYear">Årgang</label>
            </div>
            <div className="wine-input-container">
              <input
                value={wineYear}
                onChange={event => setWineYear(parseInt(event.target.value))}
              />
            </div>
            {errors?.wineYear && (
              <p className="add-wine-error-validation">{errors.wineYear}</p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className="add-wine-form__col-2">
            <div className="textfield-label">
              <label>Drue</label>
            </div>
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
            <div className="wine-input-container">
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
            <div className="wine-input-container">
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
            <div className="wine-input-container">
              <input
                value={sanderRating.toString()}
                onChange={event =>
                  setSanderRating(event.target.value)
                }
              />
            </div>
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
            <div className="wine-input-container">
              <input
                value={ineRating.toString()}
                onChange={event => setIneRating(event.target.value)}
              />
            </div>
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
              <div className="textfield-label">
                <label>Hva passer vinen til?</label>
              </div>
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
                disabled={wineRegistered}
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
        {wineRegistered && (
          <div className="add-wine__wine-registered">
            <p>Vinen ble lagret!</p>
          </div>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  wineRegistered: state.wineReducer.wineRegistered
});

export default withFirebase(connect(mapStateToProps, 
       {	  addWineToWineList: dispatchers.addWineToWineList,
            resetWineRegistered: dispatchers.resetRegisteredWine
	})(AddWineForm));
