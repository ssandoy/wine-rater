import React, { useState } from "react";
import { connect } from "react-redux";
import { debouncedSearchProductsByName } from "../../api";
import * as dispatchers from "../../dispatchers";
import { withFirebase } from "../../firebase/index";
import useForm from "./useForm";
import validationSchema from "./validationSchema";
import * as images from "../../images";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import { SearchDropDown } from "./search-dropdown/search-dropdown";
import "./styles.scss";
import { checkPropTypes } from "prop-types";

const AddWineForm = props => {

  const [fitsTo, setFitsTo] = useState([]);
  const [choosenWine, setChoosenWine] = useState(false);
  const [winePicture, setWinePicture] = useState(null);
  const [wineSearchItems, setWineSearchItems] = useState([]);
  
  // TODO: CONSIDER SET INSTEAD WITH PUSH AND POP.
  const stateSchema = {
    wineName: { value: "", error: "" },
    wineType: { value: "Red", error: "" },
    wineYear: { value: "2002", error: "" },
    wineCountry: { value: "Bordeaux", error: "" },
    wineGrape: { value: "Frankrike", error: "" },
    wineRegion: { value: "Pinot Noir", error: "" },
    sanderRating: { value: "6", error: "" },
    ineRating: { value: "5", error: "" }
  };

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
  
  // TODO: HANDLE ONCLICK ON SEARCHDROPDOWN
  const handleNameSearchOnChange = async value => {
    setChoosenWine(false);
    const wineSearchResult = await debouncedSearchProductsByName(value);
    setWineSearchItems(wineSearchResult.products);
  };

  const handlSelectedWine = wine => {
    console.log(wine);
    fillFormFromWine(wine);
    setChoosenWine(true);
  };

  const fillFormFromWine = wine => {
   // TODO.
  };

  function onSubmitForm(state) {
    props.addWineToWineList(
      {
        wineName: state.wineName.value,
        wineType: state.wineType.value,
        wineYear: state.wineYear.value,
        wineCountry: state.wineCountry.value,
        wineGrape: state.wineGrape.value,
        wineRegion: state.wineRegion.value,
        sanderRating: state.sanderRating.value,
        ineRating: state.ineRating.value,
        fitsTo
      },
      props.firebase
    );
    console.log(JSON.stringify(state, null, 2));
  }

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
              name="wineName"
              className="form-control"

              value={state.wineName.value}
              onChange={handleOnChange} //  onChange={e => setWineName(e.target.value); handleNameSearchOnChange(e.target.value);}
            />
            {state.wineName.error && isFormSubmitted && (
              <p className="error">{state.wineName.error}</p>
            {wineSearchItems && wineSearchItems.length > 0 && !choosenWine && (
              <SearchDropDown
                searchItems={wineSearchItems}
                onClick={handlSelectedWine}
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
              pattern="[0-9]{4}"
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
            <label htmlFor="wineGrape">Drue</label>
            <input
              title="Wine grape"
              className="form-control"
              name="wineGrape"
              value={state.wineGrape.value}
              onChange={handleOnChange}
            />
            {state.wineGrape.error && isFormSubmitted && (
              <p className="error">{state.wineGrape.error}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="sanderRating">Rating Sander</label>
            <input
              pattern="[0-9]*[.,]?[0-9]+"
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
              pattern="[0-9]*[.,]?[0-9]+"
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
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.chicken}
              htmlFor="chicken"
              value="chicken"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.seafood}
              htmlFor="seafood"
              value="seafood"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.pasta}
              htmlFor="pasta"
              value="pasta"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.pizza}
              htmlFor="pizza"
              value="pizza"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.apetirif}
              htmlFor="apetirif"
              value="apetirif"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.deer}
              htmlFor="deer"
              value="deer"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.bull}
              htmlFor="bull"
              value="bull"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.pig}
              htmlFor="pig"
              value="pig"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={images.cheese}
              htmlFor="cheese"
              value="cheese"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="sanderRating">Bilde</label>
            <br />
            <img src={winePicture} className="wine-picture" />
          </div>
        </div>
        <button type="submit" className="add-wine-button btn btn-primary">
          Registrer vin
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  wineItems: state.wineItems
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      addWineToWineList: dispatchers.addWineToWineList
    }
  )(AddWineForm)
);

// TODO: UPDATE WINEITEM-DATA IN PARENT
// TODO: ADD IMAGEUPLOADER.
