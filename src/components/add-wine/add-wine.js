import React, { Component } from "react";
import "./add-wine.scss";
import store from '../../store';
import { withFirebase } from "../../firebase";
import {setWines, clearWines} from '../../actions/action';

// TODO: VALIDATOR

const INITIAL_STATE = {
  wineName: "",
  wineType: "RED",
  wineYear: "2002",
  sanderRating: 6.0,
  ineRating: 5.0,
  error: null
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

  onSubmit(event) {
    event.preventDefault();
    const { wineName, wineType, wineYear, ineRating, sanderRating } = this.state;
    // TODO: HOOK UP WITH DISPATCH AND ACTION.
    this.props.firebase.storeWineToFirebase(wineName, wineType, wineYear, sanderRating, ineRating);
  }

  render() {
    const { wineName, wineType, wineYear, sanderRating, ineRating, error } = this.state;
    return (
      <div className="addWineForm">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="wineName">Name</label>
            <input
              type="text"
              name="wineName"
              className="form-control"
              value={wineName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="wineType">Type</label>
            <select
              className="custom-select"
              name="wineType"
              onChange={this.onChange}
            >
              <option value="RED">Red</option>
              <option value="WHITE">White</option>
              <option value="ROSÉ">Rosé</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="wineYear">Year</label>
            <input
              pattern="[0-9]{4}"
              title="Year"
              className="form-control"
              name="wineYear"
              value={wineYear}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Score Sander</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="sanderRating"
              value={sanderRating}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Score Ine</label>
            <input
              pattern="[0-9]"
              title="Rating"
              className="form-control"
              name="ineRating"
              value={ineRating}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="addWineButton btn btn-primary">
            Add wine
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
