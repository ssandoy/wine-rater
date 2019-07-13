import React, { Component } from "react";
import "./add-wine.scss";
import { withFirebase } from '../../firebase';
// TODO: VALIDATOR

const INITIAL_STATE = {
  wineName: "",
  wineType: "RED",
  wineYear: "2002",
  error: null
};

class AddWineForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { wineName, wineType, wineYear } = this.state;
    // TODO: TEST ME.
    console.log(this.props.firebase)
    this.props.firebase
      .storeWineToFirebase("1",wineName, wineType, wineYear);
//      .then(() => {
   //     this.setState({ ...INITIAL_STATE });
    //  })
     // .catch(error => {
      //  this.setState({ error });
      //});

    event.preventDefault();
  };

  render() {
    const { wineName, wineType, wineYear, error } = this.state;
    return (
      <div className="addWineForm col-md-5">
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
              className="custom-select custom-select-xl-1 mb-1"
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
          <button
            type="submit"
            className="addWineButton btn btn-primary"
          >
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
// TODO: FIX WIDTH IN BOOTSTRAP
