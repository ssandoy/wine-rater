import { debouncedSearchProductsByNameItem } from "api";
import { validateForm } from "components/add-wine/form-util";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { Raastoff } from "data/raastoff";
import { push, ref } from "firebase/database";
import { imageKeys, imageSources } from "images";
import type React from "react";
import { type RefObject, useEffect, useRef, useState } from "react";
import { pushOrRemoveToArray } from "utils/array-utils";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import { useFirebaseContext } from "../../firebase";
import { INDICES } from "../../firebase/indices";
import CrossIcon from "../../icons/CrossIcon";
import PlusIcon from "../../icons/PlusIcon";
import type WineProduct from "../../models/product";
import type Wine from "../../models/wine";
import CroppedImageUploader from "../image-uploader/CroppedImageUploader";
import { SearchDropDown } from "../search-dropdown/search-dropdown";
import styles from "./add-wine-form.module.css";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import validationSchema, { type Errors } from "./validationSchema";

const scrollToRef = (target: RefObject<HTMLDivElement | null>) => {
  if (target.current) {
    window.scrollTo(0, target.current.offsetTop);
  }
};
// General scroll to element function

type ErrorRefKey =
  | "sanderRating"
  | "ineRating"
  | "wineYear"
  | "wineName"
  | "wineType";

const AddWineForm: React.FC = () => {
  const [isWineRegistered, setIsWineRegistered] = useState<boolean>(false);
  const errorRefMap: Record<ErrorRefKey, RefObject<HTMLDivElement | null>> = {
    sanderRating: useRef<HTMLDivElement>(null),
    ineRating: useRef<HTMLDivElement>(null),
    wineYear: useRef<HTMLDivElement>(null),
    wineName: useRef<HTMLDivElement>(null),
    wineType: useRef<HTMLDivElement>(null),
  };
  const firebase = useFirebaseContext();

  const executeErrorScroll = (errors: Errors) => {
    const firstErrorKey = Object.keys(errors).find(
      (key): key is ErrorRefKey => key in errorRefMap
    );
    if (firstErrorKey) {
      scrollToRef(errorRefMap[firstErrorKey]);
    }
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
  const [winePrice, setWinePrice] = useState<number | undefined>(undefined);
  const [selectedWine, setSelectedWine] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [manualRegistration, setManualRegistration] = useState(false);
  const [errors, setErrors] = useState<Errors | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const wineGrapeItems = Raastoff.values.map((value) => value.code);

  useEffect(() => {
    setIsWineRegistered(false);
  }, []);

  const resetSearch = () => {
    setIsWineRegistered(false);
    setWineName("");
    setErrors(null);
    setSaveError(false);
    setSelectedWine(false);
    setSanderRating("");
    setIneRating("");
    setWineYear("");
    setProductId(undefined);
    setWinePrice(undefined);
    setSelectedWine(false);
    setManualRegistration(false);
  };

  const handleSelectedWine = (wine: WineProduct) => {
    setSelectedWine(true);
    fillFormFromWine(wine);
  };

  const fillFormFromWine = (wine: WineProduct) => {
    setWineName(wine.basic.productShortName);
    setWinePicture(
      convertVinmonopoletPictureSize(
        `https://bilder.vinmonopolet.no/cache/1200x1200-0/${wine.basic.productId}-1.jpg`,
        800
      )
    );
    const { country, region } = wine.origins.origin;
    setWineCountry(country);
    setWineRegion(region);
    setWineYear(wine.basic.vintage);
    setWineType(wine.classification.productTypeName);
    setWineGrapes(wine.ingredients.grapes.map((grape) => grape.grapeDesc));
    setProductId(wine.basic.productId);
    setWinePrice(wine.prices[0]?.salesPrice);
  };

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
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
    };
    if (productId) {
      values.apiId = productId;
      if (winePrice !== undefined) {
        values.price = winePrice;
      }
    }
    if (winePicture) {
      values.winePicture = winePicture;
    }
    const validatedErrors: Errors | null = validateForm(
      validationSchema,
      values
    );
    setErrors(validatedErrors);
    if (!validatedErrors) {
      setIsSaving(true);
      setSaveError(false);
      try {
        await push(ref(firebase.database, INDICES.WINES_INDEX), values);
        setIsWineRegistered(true);
      } catch (error) {
        console.error("Failed to save wine", error);
        setSaveError(true);
      } finally {
        setIsSaving(false);
      }
    } else {
      executeErrorScroll(validatedErrors);
    }
  };
  const nameContainerWidth = selectedWine
    ? styles["add-wine-form__col-1"]
    : styles["add-wine-form__row"];
  let noOptionText = "Tast inn navnet på vinen";
  if (wineName) {
    noOptionText = "Fant ingen treff på dette navnet";
  }
  return (
    <div className={styles["add-wine"]}>
      <h1 className="page-title">Legg til ny vin</h1>
      <form onSubmit={onSubmitForm} className={styles["add-wine-form"]}>
        <div className={nameContainerWidth}>
          <div className={styles["textfield-label"]}>
            <label htmlFor="wineName">Navn</label>
          </div>
          {!manualRegistration && (
            <AsyncSearchDropdown
              selectedItems={{ label: wineName, value: wineName }}
              placeholder="Tast inn navnet på vinen"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={(value) => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder={noOptionText}
              setValue={setWineName}
            />
          )}
          {manualRegistration && (
            <div className="wine-input-container" ref={errorRefMap.wineName}>
              <input
                id="wineName"
                value={wineName}
                onChange={(event) => setWineName(event.target.value)}
              />
            </div>
          )}
          {!manualRegistration && !selectedWine && (
            <button
              type="button"
              className={styles["add-wine-form__button--manual-reg"]}
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
            <p className={styles["add-wine-error-validation"]}>
              {errors.wineName}
            </p>
          )}
        </div>
        {selectedWine && (
          <div className={styles["add-wine-form__col-2"]}>
            <div className={styles["textfield-label"]}>
              <label htmlFor="wineType">Type</label>
            </div>
            <div className="wine-input-container" ref={errorRefMap.wineType}>
              <input
                id="wineType"
                value={wineType}
                onChange={(event) => setWineType(event.target.value)}
              />
            </div>
            {errors?.wineType && (
              <p className={styles["add-wine-error-validation"]}>
                {errors.wineType}
              </p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-1"]}>
            <div
              className={styles["textfield-label"]}
              ref={errorRefMap.wineYear}
            >
              <label htmlFor="wineYear">Årgang</label>
            </div>
            <div className="wine-input-container">
              <input
                id="wineYear"
                value={wineYear}
                onChange={(event) => setWineYear(event.target.value)}
              />
            </div>
            {errors?.wineYear && (
              <p className={styles["add-wine-error-validation"]}>
                {errors.wineYear}
              </p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-2"]}>
            <div className={styles["textfield-label"]}>
              <span>Drue</span>
            </div>
            <SearchDropDown
              isDisabled={!manualRegistration}
              placeholder=""
              searchItems={wineGrapeItems}
              onClick={(grapeArray) => {
                setWineGrapes(grapeArray);
              }}
              selectedItems={wineGrapes.map((grape) => ({
                label: grape,
                value: grape,
              }))}
            />
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-1"]}>
            <div className={styles["textfield-label"]}>
              <label htmlFor="wineCountry">Land</label>
            </div>
            <div className="wine-input-container">
              <input
                id="wineCountry"
                value={wineCountry}
                onChange={(event) => setWineCountry(event.target.value)}
              />
            </div>
            {errors?.wineCountry && (
              <p className={styles["add-wine-error-validation"]}>
                {errors.wineCountry}
              </p>
            )}
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-2"]}>
            <div className={styles["textfield-label"]}>
              <label htmlFor="wineRegion">Region</label>
            </div>
            <div className="wine-input-container">
              <input
                id="wineRegion"
                value={wineRegion}
                onChange={(event) => setWineRegion(event.target.value)}
              />
            </div>
            {errors?.wineRegion && (
              <p className={styles["add-wine-error-validation"]}>
                {errors.wineRegion}
              </p>
            )}
          </div>
        )}
        {selectedWine && (
          <div
            className={styles["add-wine-form__col-1"]}
            ref={errorRefMap.sanderRating}
          >
            <div className={styles["textfield-label"]}>
              <label htmlFor="sanderRating">Rating Sander</label>{" "}
            </div>
            <div className="wine-input-container">
              <input
                id="sanderRating"
                value={sanderRating.toString()}
                onChange={(event) => setSanderRating(event.target.value)}
              />
            </div>
            {!!errors && errors.sanderRating && (
              <div>
                <p className={styles["add-wine-error-validation"]}>
                  {errors.sanderRating}
                </p>
              </div>
            )}
          </div>
        )}
        {selectedWine && (
          <div
            className={styles["add-wine-form__col-2"]}
            ref={errorRefMap.ineRating}
          >
            <div className={styles["textfield-label"]}>
              <label htmlFor="ineRating">Rating Ine</label>
            </div>
            <div className="wine-input-container">
              <input
                id="ineRating"
                value={ineRating.toString()}
                onChange={(event) => setIneRating(event.target.value)}
              />
            </div>
            {!!errors && errors.ineRating && (
              <div>
                <p className={styles["add-wine-error-validation"]}>
                  {errors.ineRating}
                </p>
              </div>
            )}
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-1"]}>
            <div className={styles["textfield-label"]}>
              <span>Hva passer vinen til?</span>
            </div>
            <div className={styles["add-wine-form__fits-to-grid"]}>
              {imageKeys.map((imageKey) => {
                if (imageKey === "fish" || imageKey === "cake") {
                  return null;
                }
                return (
                  <div
                    className={styles["add-wine-form__fits-to-cell"]}
                    key={imageKey}
                  >
                    <ImageCheckbox
                      key={imageKey}
                      image={imageSources[imageKey]}
                      htmlFor={imageKey}
                      value={imageKey}
                      name="fitsTo"
                      checked={fitsTo.includes(imageKey)}
                      onClick={(value) =>
                        setFitsTo(pushOrRemoveToArray(fitsTo, value))
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__col-2"]}>
            <div className={styles["add-wine-form__label-button-container"]}>
              <div className={styles["textfield-label"]}>
                <label htmlFor="winePicture">Bilde</label>
              </div>
              <button
                type="button"
                className={styles["add-wine-form__button--upload"]}
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
                firebaseStorageRef={INDICES.WINE_PICTURES_INDEX}
                handleUpdateComplete={(fileUrl) => {
                  setWinePicture(fileUrl);
                  setShowImageUploader(false);
                }}
              />
            )}
          </div>
        )}
        {selectedWine && (
          <div className={styles["add-wine-form__row"]}>
            <div className={styles["add-wine-form__buttons"]}>
              <button
                disabled={isWineRegistered || isSaving}
                type="submit"
                className={`${styles["add-wine-form__button"]} ${styles["add-wine-form__button-add"]}`}
              >
                <PlusIcon />{" "}
                <span className={styles["add-wine-form__button-label"]}>
                  {isSaving ? "Lagrer..." : "Registrer"}
                </span>
              </button>
              <button
                type="button"
                onClick={resetSearch}
                className={`${styles["add-wine-form__button"]} ${styles["add-wine-form__button-reset"]}`}
              >
                <CrossIcon />{" "}
                <span className={styles["add-wine-form__button-label"]}>
                  Start på nytt
                </span>
              </button>
            </div>
          </div>
        )}
        {isWineRegistered && (
          <div className={styles["add-wine-form__row"]}>
            <div className={styles["add-wine__wine-registered"]}>
              <p>Vinen ble lagret!</p>
            </div>
          </div>
        )}
        {saveError && (
          <p
            className={`${styles["add-wine-form__row"]} ${styles["add-wine-error-request"]}`}
            role="alert"
          >
            Kunne ikke lagre vinen. Kontroller nettverkstilkoblingen og prøv
            igjen.
          </p>
        )}
      </form>
    </div>
  );
};

export default AddWineForm;
