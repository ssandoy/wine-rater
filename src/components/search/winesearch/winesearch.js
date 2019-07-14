import React, { Component } from "react";
import "./winesearch.scss";
import { withFirebase } from "../../../firebase";

const INITIAL_STATE = {
  wineName: "",
  wineType: "", // TODO []
  wineYear: "", // TODO INTERVAL
  error: null
};

class WineSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.firebase.database.ref('wines').once('value')
      .then(wineItemsSnapshot => {
        this.props.onClick(this.props.firebase.snapshotToArray(wineItemsSnapshot));
      });
  }

  render() {
    const { wineName, wineType, wineYear, error } = this.state;
    return (
      <div className="searchWineForm">
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="wineName">Filter by name</label>
            <input
              type="text"
              name="wineName"
              className="form-control"
              value={wineName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            {
              // TODO: DROPDOWN AND MULTIPLE OPTIONS.
            }
            <label htmlFor="wineType">Filter by type</label>
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
            <label htmlFor="wineYear">Filter by year</label>
            {
              // TODO: MAKE IT INTERVAL.
            }
            <input
              pattern="[0-9]{4}"
              title="Year"
              className="form-control"
              name="wineYear"
              value={wineYear}
              onChange={this.onChange}
            />
          </div>
          <button type="submit" className="addWineButton btn btn-primary">
            Filter wines
          </button>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withFirebase(WineSearchComponent);

// TODO: IMPLEMENT FIREBASE-LISTENER. 
