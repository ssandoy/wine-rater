import React, { useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";
import { Formik } from "formik";
import { withFirebase } from "firebase/index";
import validationSchema from "./validationSchema";
import * as images from "images";
import { Raastoff } from "data/raastoff";
import { imageKeys } from "images";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { FaImage } from "react-icons/fa";
import { SearchDropDown } from "../search-dropdown/search-dropdown";
import { convertVinmonopoletPictureSize } from "utils/string-utils";
import "./styles.scss";
import PropTypes from "prop-types";
import { pushOrRemoveToArray } from "utils/array-utils";
import { AsyncSearchDropdown } from "components/search-dropdown/async-search-dropdown";
import { validateForm } from "components/add-wine/form-util";

const stateSchema = {
  wineName: null,
  wineType: null,
  wineYear: "2002",
  wineCountry: "Frankrike",
  wineGrapes: null,
  wineRegion: "",
  sanderRating: "6",
  ineRating: "5"
};

const wineTypes = [
  { label: "Rødvin", value: "RED" },
  { label: "Hvitvin", value: "WHITE" },
  { label: "Rosé", value: "ROSÉ" },
  { label: "Musserende", value: "SPARKLING" }
];

const AddWineForm = props => {
  // TODO UPDATE.
  const [fitsTo, setFitsTo] = useState([]);
  const [winePicture, setWinePicture] = useState(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  const onImageUploadChange = event => {
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setWinePicture(reader.result);
    };

    reader.readAsDataURL(file);
    // TODO: HOW TO STORE? AS URL? AS IMG?
  };

  const handleSelectedWine = wine => {
    fillFormFromWine(wine);
  };

  const fillFormFromWine = wine => {
    stateSchema.wineName = wine.name;
    setWinePicture(convertVinmonopoletPictureSize(wine.images[1].url, 800));
    stateSchema.wineCountry = wine.main_country.name;
    stateSchema.wineRegion =
      wine.district && wine.district.name ? wine.district.name : "";
    // TODO: SET YEAR BASED ON REGEX IF MATCH.
  };

  const onSubmitForm = state => {
    props.addWineToWineList(
      {
        wineName: state.wineName,
        wineType: state.wineType,
        wineYear: state.wineYear,
        wineCountry: state.wineCountry,
        wineGrapes: state.wineGrapes,
        wineRegion: state.wineRegion,
        sanderRating: state.sanderRating,
        ineRating: state.ineRating,
        fitsTo,
        winePicture
      },
      props.firebase
    );
  };

  const setWineType = wineType => {
    stateSchema.wineType = wineType;
  };

  const setWineGrapes = wineGrapes => {
    stateSchema.wineGrapes = wineGrapes;
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={stateSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmitForm(values);
        }}
        validate={values => validateForm(validationSchema, values)}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="wine-form">
            <div className="row">
              <div className="form-group col-sm-12 col-md-8">
                <label htmlFor="wineName">Navn</label>
                <AsyncSearchDropdown
                  placeholder="Velg vin"
                  onClick={value => {
                    handleSelectedWine(value);
                    handleChange(value.name);
                  }}
                  noOptionPlaceholder="Tast inn navnet på vinen"
                />
                {errors.wineName && <p className="error">{errors.wineName}</p>}
              </div>

              <div className="form-group col-sm-10 col-md-4">
                <label>Type</label>
                <SearchDropDown
                  placeholder="Velg vintype"
                  searchItems={wineTypes}
                  isMulti={false}
                  onClick={wineType => setWineType(wineType)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-10 col-md-6">
                <label htmlFor="wineYear">År</label>
                <input
                  title="Year"
                  className="form-control"
                  name="wineYear"
                  value={values.wineYear}
                  onChange={handleChange}
                />
                {errors.wineYear && <p className="error">{errors.wineYear}</p>}
              </div>

              <div className="form-group col-sm-10 col-md-6">
                <label htmlFor="wineCountry">Land</label>
                <input
                  title="Wine country"
                  className="form-control"
                  name="wineCountry"
                  value={values.wineCountry}
                  onChange={handleChange}
                />
                {errors.wineCountry && (
                  <p className="error">{errors.wineCountry}</p>
                )}
              </div>
              <div className="form-group col-sm-10 col-md-6">
                <label htmlFor="wineRegion">Region</label>
                <input
                  title="Wine region"
                  className="form-control"
                  name="wineRegion"
                  value={values.wineRegion}
                  onChange={handleChange}
                />
                {errors.wineRegion && (
                  <p className="error">{errors.wineRegion}</p>
                )}
              </div>
              <div className="form-group col-sm-10 col-md-6">
                <label>Drue</label>
                <SearchDropDown
                  placeholder="Velg vindrue"
                  searchItems={wineGrapeItems}
                  onClick={grapeArray => {
                    setWineGrapes(grapeArray);
                    handleChange("grapeArray");
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-10 col-md-6">
                <label htmlFor="sanderRating">Rating Sander</label>
                <input
                  title="Rating"
                  className="form-control"
                  name="sanderRating"
                  value={values.sanderRating}
                  onChange={handleChange}
                />
                {errors.sanderRating && (
                  <p className="error">{errors.sanderRating}</p>
                )}
              </div>
              <div className="form-group col-sm-10 col-md-6">
                <label htmlFor="ineRating">Rating Ine</label>
                <input
                  title="Rating"
                  className="form-control"
                  name="ineRating"
                  value={values.ineRating}
                  onChange={handleChange}
                />
                {errors.ineRating && (
                  <p className="error">{errors.ineRating}</p>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Passer til</label>
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
                      pushOrRemoveToArray(fitsTo, event.target.value)
                    }
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
                    <input
                      type="file"
                      id="single"
                      onChange={onImageUploadChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="add-wine-button btn btn-primary">
              Registrer vin
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

AddWineForm.propTypes = {
  addWineToWineList: PropTypes.func,
  firebase: PropTypes.object
};

export default withFirebase(
  connect(
    null,
    {
      addWineToWineList: dispatchers.addWineToWineList
    }
  )(AddWineForm)
);
