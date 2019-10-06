import React, { useState } from "react";
import { connect } from "react-redux";
import apetirif from "../../images/apetirif.png";
import bull from "../../images/bull.png";
import cheese from "../../images/cheese.png";
import chicken from "../../images/chicken.png";
import crab from "../../images/crab.png";
import deer from "../../images/deer.svg";
import pasta from "../../images/pasta.png";
import pig from "../../images/pig.png";
import pizza from "../../images/pizza.png";
import "./styles.scss";
import * as dispatchers from "../../dispatchers";
import ImageCheckbox from "./image-checkbox/image-checkbox";
// TODO: VALIDATOR

const AddWineForm = props => {
  // TODO: USECONTEXT??
  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("RED");
  const [wineYear, setWineYear] = useState("2002");
  const [wineRegion, setWineRegion] = useState("Bordeaux");
  const [wineCountry, setWineCountry] = useState("Frankrike");
  const [wineGrape, setWineGrape] = useState("Pinot Noir");
  const [sanderRating, setSanderRating] = useState(6.0);
  const [ineRating, setIneRating] = useState(5.0);
  const [fitsTo, setFitsTo] = useState([]);
  const [error, setError] = useState(null);

  const handleCheckBoxChange = event => {
    // TODO: PRETTIFY AND USE SETSTATE.
    // if (state[event.target.name] instanceof Array) {
    //   if (state[event.target.name].includes(event.target.value)) {
    //     state[event.target.name] = state[event.target.name].filter(
    //       value => value !== event.target.value
    //     );
    //   } else {
    //     state[event.target.name].push(event.target.value);
    //   }
    // }
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

  const onSubmit = event => {
    event.preventDefault();
    // TODO: HOOK UP WITH DISPATCH AND ACTION.
    console.log(props);
    props.addWineToWineList({
      wineName,
      wineType,
      wineYear,
      wineCountry,
      wineGrape,
      wineRegion,
      sanderRating,
      ineRating,
      fitsTo,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="wine-form">
        <div className="row">
          <div className="form-group col-sm-10 col-md-8">
            <label htmlFor="wineName">Navn</label>
            <input
              type="text"
              name="wineName"
              className="form-control"
              value={wineName}
              onChange={e => {
                setWineName(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-sm-10 col-md-4">
            <label htmlFor="wineType">Type</label>
            <select
              className="custom-select"
              name="wineType"
              onChange={e => {
                setWineType(e.target.value);
              }}
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
              value={wineYear}
              onChange={e => {
                setWineYear(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineCountry">Land</label>
            <input
              title="Wine country"
              className="form-control"
              name="wineCountry"
              value={wineCountry}
              onChange={e => {
                setWineCountry(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineRegion">Region</label>
            <input
              title="Wine region"
              className="form-control"
              name="wineRegion"
              value={wineRegion}
              onChange={e => {
                setWineRegion(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="wineGrape">Drue</label>
            <input
              title="Wine grape"
              className="form-control"
              name="wineGrape"
              value={wineGrape}
              onChange={e => {
                setWineGrape(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="sanderRating">Rating Sander</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="sanderRating"
              value={sanderRating}
              onChange={e => {
                setSanderRating(e.target.value);
              }}
            />
          </div>
          <div className="form-group col-sm-10 col-md-6">
            <label htmlFor="ineRating">Rating Ine</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="ineRating"
              value={ineRating}
              onChange={e => {
                setIneRating(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Passer til</label>
          <div className="row fits-to-row">
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={chicken}
              htmlFor="chicken"
              value="chicken"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={crab}
              htmlFor="seafood"
              value="seafood"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pasta}
              htmlFor="pasta"
              value="pasta"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pizza}
              htmlFor="pizza"
              value="pizza"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={apetirif}
              htmlFor="apetirif"
              value="apetirif"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={deer}
              htmlFor="deer"
              value="deer"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={bull}
              htmlFor="bull"
              value="bull"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={pig}
              htmlFor="pig"
              value="pig"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
            <ImageCheckbox
              columnProps="col-sm-4 col-md-1"
              image={cheese}
              htmlFor="cheese"
              value="cheese"
              name="fitsTo"
              onChange={handleCheckBoxChange}
            />
          </div>
        </div>
        <button type="submit" className="add-wine-button btn btn-primary">
          Registrer vin
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  wineItems: state.wineItems,
});

export default connect(
  mapStateToProps,
  {
    addWineToWineList: dispatchers.addWineToWineList,
  }
)(AddWineForm);

// TODO: ADD VALIDATION FOR NUMBERS ETC.
// TODO: UPDATE WINEITEM-DATA IN PARENT
// TODO: ADD ALT-PROP TO IMAGES.
// TODO: ADD IMAGEUPLOADER.
