import React, { useState } from "react";
import { connect } from "react-redux";
import { debouncedSearchProductsByName } from "../../api";
import * as dispatchers from "../../dispatchers";
import { withFirebase } from "../../firebase/index";
import useForm from "./useForm";
import validationSchema from "./validationSchema";
import * as images from "../../images";
import { Raastoff } from "../../data/raastoff";
import { imageKeys } from "../../images";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { FaImage } from "react-icons/fa";
import { SearchDropDown } from "./search-dropdown/search-dropdown";
import { convertVinmonopoletPictureSize } from "../../utils/string-utils";
import "./styles.scss";
import PropTypes from "prop-types";

const AddWineForm = props => {
  const [fitsTo, setFitsTo] = useState([]);
  const [choosenWine, setChoosenWine] = useState(false);
  const [winePicture, setWinePicture] = useState(null);
  const [wineSearchItems, setWineSearchItems] = useState([]);
  const [wineGrapes, setWineGrapes] = useState([]);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  const stateSchema = {
    wineName: { value: "", error: "" },
    wineType: { value: "Red", error: "" },
    wineYear: { value: "2002", error: "" },
    wineCountry: { value: "Frankrike", error: "" },
    wineGrapes: { value: [], error: "" },
    wineRegion: { value: "Bordeaux", error: "" },
    sanderRating: { value: "6", error: "" },
    ineRating: { value: "5", error: "" },
  };

  // TODO REPLACE WITH ARRAY-utils.
  const handleCheckBoxChange = event => {
    let fitsToArray = [...fitsTo];
    if (fitsToArray.includes(event.target.value)) {
      const index = fitsToArray.findIndex(
        value => value === event.target.value
      );
      fitsToArray.splice(index, 1);
    } else {
      fitsToArray.push(event.target.value);
    }
    setFitsTo(fitsToArray);
  };

  const onImageUploadChange = event => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setWinePicture(reader.result);
    };

    reader.readAsDataURL(file);
    // TODO: HOW TO STORE? AS URL? AS IMG?
  };

  // TODO: HANDLE ONCLICK ON SEARCHDROPDOWN
  const handleNameSearchOnChange = async value => {
    setChoosenWine(false);
    const wineSearchResult = await debouncedSearchProductsByName(value);
    //FIXME. MAP TO NAME BROKE SEARCHDROPDOWN SINCE WE CANT ACCESS images etc ANYMORE.
    setWineSearchItems(wineSearchResult.products.map(product => product.name));
  };

  const handlSelectedWine = (wine, state) => {
    fillFormFromWine(wine, state);
    setChoosenWine(true);
  };

  const fillFormFromWine = (wine, state_) => {
    // TODO UPDATE SOMEHOW.
    setWinePicture(convertVinmonopoletPictureSize(wine.images[1].url, 800));
  };

  const onSubmitForm = state => {
    props.addWineToWineList(
      {
        wineName: state.wineName.value,
        wineType: state.wineType.value,
        wineYear: state.wineYear.value,
        wineCountry: state.wineCountry.value,
        wineGrapes: state.wineGrapes.value,
        wineRegion: state.wineRegion.value,
        sanderRating: state.sanderRating.value,
        ineRating: state.ineRating.value,
        fitsTo,
        winePicture,
      },
      props.firebase
    );
  };

  const { state, handleOnChange, handleOnSubmit, isFormSubmitted } = useForm(
    stateSchema,
    validationSchema,
    onSubmitForm
  );

  return (
    // TODO: SEPARATE OUT SOME OF THIS AS SEPARATE COMPONENTS. TMI.
    <div>
      <form onSubmit={handleOnSubmit} className="wine-form">
        <div className="row">
          <div className="form-group col-sm-12 col-md-8">
            <label htmlFor="wineName">Navn</label>
            <input
              type="text"
              autoComplete="off"
              name="wineName"
              className="form-control"
              value={state.wineName.value}
              onChange={e => {
                handleOnChange(e);
                handleNameSearchOnChange(e.target.value);
              }}
            />
            {state.wineName.error && isFormSubmitted && (
              <p className="error">{state.wineName.error}</p>
            )}
            {wineSearchItems && wineSearchItems.length > 0 && !choosenWine && (
              <SearchDropDown
                placeholder="Velg vin"
                searchItems={wineSearchItems}
                onClick={wine => handlSelectedWine(wine, state)}
              />
            )}
          </div>

          <div className="form-group col-sm-10 col-md-4">
            <label htmlFor="wineType">Type</label>
            <select
              className="custom-select"
              name="wineType"
              onChange={handleOnChange}
            >
              <option value="RED">Rød</option>
              <option value="WHITE">Hvit</option>
              <option value="ROSÉ">Rosé</option>
              <option value="SPARKLING">Musserende</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineYear">År</label>
            <input
              title="Year"
              className="form-control"
              name="wineYear"
              value={state.wineYear.value}
              onChange={handleOnChange}
            />
            {state.wineYear.error && isFormSubmitted && (
              <p className="error">{state.wineYear.error}</p>
            )}
          </div>

          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineCountry">Land</label>
            <input
              title="Wine country"
              className="form-control"
              name="wineCountry"
              value={state.wineCountry.value}
              onChange={handleOnChange}
            />
            {state.wineCountry.error && isFormSubmitted && (
              <p className="error">{state.wineCountry.error}</p>
            )}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineRegion">Region</label>
            <input
              title="Wine region"
              className="form-control"
              name="wineRegion"
              value={state.wineRegion.value}
              onChange={handleOnChange}
            />
            {state.wineRegion.error && isFormSubmitted && (
              <p className="error">{state.wineRegion.error}</p>
            )}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label>Drue</label>
              <SearchDropDown
                placeholder="Velg vindrue"
                searchItems={wineGrapeItems}
                onClick={grapeArray => setWineGrapes(grapeArray)}
              />
            {!wineGrapes.length && isFormSubmitted && (
              <p className="error">Du må velge vindrue</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="sanderRating">Rating Sander</label>
            <input
              title="Rating"
              className="form-control"
              name="sanderRating"
              value={state.sanderRating.value}
              onChange={handleOnChange}
            />
            {state.sanderRating.error && isFormSubmitted && (
              <p className="error">{state.sanderRating.error}</p>
            )}
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="ineRating">Rating Ine</label>
            <input
              title="Rating"
              className="form-control"
              name="ineRating"
              value={state.ineRating.value}
              onChange={handleOnChange}
            />
            {state.ineRating.error && isFormSubmitted && (
              <p className="error">{state.ineRating.error}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Passer til</label>
          <div className="row fits-to-row">
            {imageKeys.map(imageKey => (
              <ImageCheckbox
                columnProps="col-4 col-md-1"
                image={images[imageKey]}
                htmlFor={imageKey}
                value={imageKey}
                name="fitsTo"
                onChange={handleCheckBoxChange}
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="winePicture">Bilde</label>
            <br />
            {winePicture ? (
              <img src={winePicture} className="wine-picture" />
            ) : (
              <div className="image-button">
                <label htmlFor="single">
                  <FaImage color="#6d84b4" size={60} />
                </label>
                <input type="file" id="single" onChange={onImageUploadChange} />
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="add-wine-button btn btn-primary">
          Registrer vin
        </button>
      </form>
    </div>
  );
};

AddWineForm.propTypes = {
  addWineToWineList: PropTypes.func,
  firebase: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  wineItems: state.wineItems,
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      addWineToWineList: dispatchers.addWineToWineList,
    }
  )(AddWineForm)
);

// TODO: UPDATE WINEITEM-DATA IN PARENT
// TODO: ADD IMAGEUPLOADER.
