import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";

import { debouncedSearchProductsByNameItem, getWine } from "api/api";
import validationSchema, { Errors } from "./validationSchema";
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
import CroppedImageUploader from "../image-uploader/CroppedImageUploader";
import PlusIcon from "../../icons/PlusIcon";
import CrossIcon from "../../icons/CrossIcon";

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
    wineYear: useRef(null),
    wineName: useRef(null),
    wineType: useRef(null)
  };

  const executeErrorScroll = errors => {
    scrollToRef(errorRefMap[Object.keys(errors)[0]]);
  };

  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineYear, setWineYear] = useState<string>("");
  const [wineCountry, setWineCountry] = useState("");
  const [wineGrapes, setWineGrapes] = useState<string[]>([]);
  const [wineRegion, setWineRegion] = useState("");
  const [ineRating, setIneRating] = useState<string>("");
  const [sanderRating, setSanderRating] = useState<string>("");
  const [fitsTo, setFitsTo] = useState<string[]>([]);
  const [winePicture, setWinePicture] = useState<string | undefined>(undefined);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [selectedWine, setSelectedWine] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [manualRegistration, setManualRegistration] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  useEffect(() => {
    resetWineRegistered();
  }, [resetWineRegistered]);

  const resetSearch = () => {
    resetWineRegistered();
    setWineName("");
    setErrors(null);
    setSelectedWine(false);
    setSanderRating("");
    setIneRating("");
    setWineYear("");
    setSelectedWine(false);
    setManualRegistration(false);
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
    const values: Wine = {
      wineName,
      wineType,
      wineYear,
      wineCountry,
      wineGrapes,
      wineRegion,
      ineRating,
      sanderRating,
      fitsTo,
      winePicture
    };
    if (productId) {
      values.apiId = productId;
    }
    const validatedErrors: Errors | null = validateForm(
      validationSchema,
      values
    );
    setErrors(validatedErrors);
    if (!validatedErrors) {
      addWineToWineList(values, firebase);
    } else {
      executeErrorScroll(validatedErrors);
    }
  };
  const nameContainerWidth = selectedWine
    ? "add-wine-form__col-1"
    : "add-wine-form__row";
  let noOptionText = "Tast inn navnet på vinen";
  if (wineName) {
    noOptionText = "Fant ingen treff på dette navnet";
  }
  return (
    <div className="add-wine">
      <h1 className="page-title">Legg til ny vin</h1>
      <form onSubmit={onSubmitForm} className="add-wine-form">
        <div className={nameContainerWidth}>
          <div className="textfield-label">
            <label htmlFor="wineName">Navn</label>
          </div>
          {!manualRegistration && (
            <AsyncSearchDropdown
              selectedItems={{ label: wineName, value: wineName }}
              placeholder="Tast inn navnet på vinen"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={value => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder={noOptionText}
              setValue={setWineName}
            />
          )}
          {manualRegistration && (
            <div className="wine-input-container" ref={errorRefMap.wineName}>
              <input
                value={wineName}
                onChange={event => setWineName(event.target.value)}
              />
            </div>
          )}
          {!manualRegistration && !selectedWine && (
            <button
              type="button"
              className="add-wine-form__button--manual-reg"
              onClick={() => {
                if (!manualRegistration) {
                  setSelectedWine(true);
                } else {
                  setSelectedWine(false);
                }
                setManualRegistration(!manualRegistration);
              }}
            >
              Finner du ikke vinen? Registrer den manuelt!
            </button>
          )}
          {errors?.wineName && (
            <p className="add-wine-error-validation">{errors.wineName}</p>
          )}
        </div>
        {selectedWine && (
          <div className="add-wine-form__col-2">
            <div className="textfield-label">
              <label>Type</label>
            </div>
            <div className="wine-input-container" ref={errorRefMap.wineType}>
              <input
                value={wineType}
                onChange={event => setWineType(event.target.value)}
              />
            </div>
            {errors?.wineType && (
              <p className="add-wine-error-validation">{errors.wineType}</p>
            )}
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
                onChange={event => setWineYear(event.target.value)}
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
              isDisabled={!manualRegistration}
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
              <input
                value={wineCountry}
                onChange={event => setWineCountry(event.target.value)}
              />
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
              <input
                value={wineRegion}
                onChange={event => setWineRegion(event.target.value)}
              />
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
                onChange={event => setSanderRating(event.target.value)}
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
                      checked={fitsTo.includes(imageKey)}
                      onClick={value =>
                        setFitsTo(pushOrRemoveToArray(fitsTo, value))
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
            <div className="add-wine-form__label-button-container">
              <div className="textfield-label">
                <label htmlFor="winePicture">Bilde</label>
              </div>
              <button
                type="button"
                className="add-wine-form__button--upload"
                onClick={() => setShowImageUploader(!showImageUploader)}
              >
                Laste opp eget bilde?
              </button>
            </div>
            {winePicture && !showImageUploader && (
              <img
                src={winePicture as string}
                className="wine-picture"
                alt="wine"
              />
            )}
            {showImageUploader && (
              <CroppedImageUploader
                firebase={firebase}
                firebaseStorageRef="wine-pictures"
                handleUpdateComplete={fileUrl => {
                  setWinePicture(fileUrl);
                  setShowImageUploader(false);
                }}
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
                <PlusIcon />{" "}
                <span className="add-wine-form__button-label">Registrer</span>
              </button>
              <button
                onClick={resetSearch}
                className="add-wine-form__button add-wine-form__button-reset"
              >
                <CrossIcon />{" "}
                <span className="add-wine-form__button-label">
                  Start på nytt
                </span>
              </button>
            </div>
          </div>
        )}
        {wineRegistered && (
          <div className="add-wine-form__row">
            <div className="add-wine__wine-registered">
              <p>Vinen ble lagret!</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
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
