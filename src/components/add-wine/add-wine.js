import React, { Component } from "react";
import ImageCheckbox from "./image-checkbox/image-checkbox";
import "./add-wine.scss";
import store from "../../store";
import { withFirebase } from "../../firebase";
import { setWines, clearWines } from "../../actions/action";
import chicken from "../../images/chicken.png";
import crab from "../../images/crab.png";
import pizza from "../../images/pizza.png";
import pasta from "../../images/pasta.png";
import deer from "../../images/deer.svg";
import apetirif from "../../images/apetirif.png";
import pig from "../../images/pig.png";
import bull from "../../images/bull.png";
import cheese from "../../images/cheese.png";
// TODO: VALIDATOR

const INITIAL_STATE = {
  wineName: "",
  wineType: "RED",
  wineYear: "2002",
  sanderRating: 6.0,
  ineRating: 5.0,
  fitsTo: [],
  error: null,
};

class AddWineForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // TODO: FIX STATE OF CHECKBOXFORM.
  handleCheckBoxChange(event) {
    if (this.state[event.target.name] instanceof Array) {
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const {
      wineName,
      wineType,
      wineYear,
      ineRating,
      sanderRating,
      fitsTo,
    } = this.state;
    // TODO: HOOK UP WITH DISPATCH AND ACTION.
    /* this.props.firebase.storeWineToFirebase(
      wineName,
      wineType,
      wineYear,
      sanderRating,
      ineRating
    );*/
    console.log(fitsTo);
  }

  render() {
    const {
      wineName,
      wineType,
      wineYear,
      sanderRating,
      ineRating,
      error,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit} className="add-wine-form">
          <div className="row">
            <div className="form-group col-sm-10 col-md-8">
              <label htmlFor="wineName">Navn</label>
              <input
                type="text"
                name="wineName"
                className="form-control"
                value={wineName}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-sm-10 col-md-4">
              <label htmlFor="wineType">Type</label>
              <select
                className="custom-select"
                name="wineType"
                onChange={this.onChange}
              >
                <option value="RED">Rød</option>
                <option value="WHITE">Hvit</option>
                <option value="ROSÉ">Rosé</option>
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
                onChange={this.onChange}
              />
            </div>
            <div className="form-group col-sm-10 col-md-6">
              <label htmlFor="wineYear">Region/Drue</label>
              <input
                pattern="[0-9]{4}"
                title="Year"
                className="form-control"
                name="wineYear"
                value={wineYear}
                onChange={this.onChange}
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
                onChange={this.onChange}
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
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Passer til</label>
            <div className="row fits-to-row">
              <ImageCheckbox
                columnProps="col-sm-4"
                image={chicken}
                htmlFor="chicken"
                value="chicken"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={crab}
                htmlFor="seafood"
                value="seafood"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={pasta}
                htmlFor="pasta"
                value="pasta"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={pizza}
                htmlFor="pizza"
                value="pizza"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={apetirif}
                htmlFor="apetirif"
                value="apetirif"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={deer}
                htmlFor="deer"
                value="deer"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={bull}
                htmlFor="bull"
                value="bull"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={pig}
                htmlFor="pig"
                value="pig"
                name="fitsTo"
                onChange={this.onChange}
              />
              <ImageCheckbox
                columnProps="col-sm-4"
                image={cheese}
                htmlFor="cheese"
                value="cheese"
                name="fitsTo"
                onChange={this.onChange}
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
  }
}

export default withFirebase(AddWineForm);

// TODO: ADD VALIDATION FOR NUMBERS ETC.
// TODO: UPDATE WINEITEM-DATA IN PARENT
// TODO: ADD ALT-PROP TO IMAGES.
// TODO: ADD IMAGEUPLOADER.
