import React, { useState } from "react";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";
import { withFirebase } from "firebase/index";
import TextField from "@material-ui/core/TextField";

import { debouncedSearchProductsByNameItem } from "api/api";
import validationSchema from "./validationSchema";
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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    backgroundColor: "#e8eeef",
    // border: "1px solid grey",
    borderRadius: "4%",
    fontSize: "1.2em",
    marginTop: 0,
    marginRight: theme.spacing(1)
    // TODO FIX PADDING.
  }
}));

const wineTypes = [
  { label: "Rødvin", value: "RED" },
  { label: "Hvitvin", value: "WHITE" },
  { label: "Rosé", value: "ROSÉ" },
  { label: "Musserende", value: "SPARKLING" }
];

const AddWineForm = props => {
  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineYear, setWineYear] = useState(null);
  const [wineCountry, setWineCountry] = useState(null);
  const [wineGrapes, setWineGrapes] = useState([]);
  const [wineRegion, setWineRegion] = useState("");
  const [ineRating, setIneRating] = useState(null);
  const [sanderRating, setSanderRating] = useState(null);
  const [fitsTo, setFitsTo] = useState([]);
  const [winePicture, setWinePicture] = useState(null);
  const [errors, setErrors] = useState(null);

  const wineGrapeItems = Raastoff.values.map(value => value.code);

  // TODO ADD POSSIBILITY TO ADD WINE NON-EXISTING IN POLET.

  // FIXME I HATE VALIDATION.

  const classes = useStyles();

  const handleSelectedWine = wine => {
    fillFormFromWine(wine);
  };

  const fillFormFromWine = wine => {
    setWineName(wine.name);
    setWinePicture(convertVinmonopoletPictureSize(wine.images[1].url, 800));
    setWineCountry(wine.main_country.name);
    setWineRegion(
      wine.district && wine.district.name ? wine.district.name : ""
    );
    setWineYear(!wine.name.match(/\d{4}/) ? "" : wine.name.match(/\d{4}/)[0]);
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
    setErrors(validateForm(validationSchema, values));
    if (!!errors) {
      props.addWineToWineList(values, props.firebase);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm} className="wine-form">
        <div className="row">
          <div className="form-group col-sm-12 col-md-8">
            <label htmlFor="wineName">Navn</label>
            <AsyncSearchDropdown
              placeholder="Velg vin"
              debouncedPromise={debouncedSearchProductsByNameItem}
              onClick={value => {
                handleSelectedWine(value);
              }}
              noOptionPlaceholder="Tast inn navnet på vinen"
            />
          </div>
          <div className="form-group col-sm-6 col-md-4">
            <label>Type</label>
            <SearchDropDown
              placeholder="Velg vintype"
              searchItems={wineTypes}
              isMulti={false}
              onClick={wineType => setWineType(wineType)}
            />
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Årgang</label>
            </div>
            <TextField
              fullWidth
              id="standard-uncontrolled"
              label="Årgang"
              value={wineYear}
              InputLabelProps={{
                shrink: true
              }}
              onChange={event => setWineYear(event.target.value)}
              className={classes.textField}
              margin="normal"
            />
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Land</label>
            </div>
            <TextField
              fullWidth
              id="standard-uncontrolled"
              label="Land"
              InputLabelProps={{
                shrink: true
              }}
              value={wineCountry}
              onChange={event => setWineCountry(event.target.value)}
              className={classes.textField}
              margin="normal"
            />
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Region</label>
            </div>
            <TextField
              fullWidth
              id="standard-uncontrolled"
              label="Region"
              InputLabelProps={{
                shrink: true
              }}
              value={wineRegion}
              onChange={event => setWineRegion(event.target.value)}
              className={classes.textField}
              margin="normal"
            />
          </div>
          <div className="form-group col-sm-12 col-md-6">
            <label>Drue</label>
            <SearchDropDown
              placeholder="Velg vindrue"
              searchItems={wineGrapeItems}
              onClick={grapeArray => {
                setWineGrapes(grapeArray);
              }}
            />
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <div className="textfield-label">
              <label htmlFor="sanderRating">Rating Sander</label>{" "}
            </div>
            <TextField
              fullWidth
              id="standard-uncontrolled"
              label="Rating"
              value={sanderRating}
              onChange={event => setSanderRating(event.target.value)}
              className={classes.textField}
              margin="normal"
            />
          </div>
          <div className="form-group col-sm-6 col-md-6">
            <div className="textfield-label">
              <label htmlFor="ineRating">Rating Ine</label>
            </div>
            <TextField
              fullWidth
              id="standard-uncontrolled"
              label="Rating"
              value={ineRating}
              onChange={event => setIneRating(event.target.value)}
              className={classes.textField}
              margin="normal"
            />
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
                  setFitsTo(pushOrRemoveToArray(fitsTo, event.target.value))
                }
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <label htmlFor="winePicture">Bilde</label>
            <br />
            {winePicture && (
              <img src={winePicture} className="wine-picture" alt="wine" />
            )}
          </div>
        </div>
        {!!errors && <p>{JSON.stringify(errors)}</p>}
        <button type="submit" className="add-wine-button btn btn-primary">
          Registrer vin
        </button>
      </form>
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
