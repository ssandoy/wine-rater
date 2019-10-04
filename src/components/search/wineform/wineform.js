import React, { Component } from "react";
import store from "../../../store";
import { withFirebase } from "../../../firebase";
import { setWines, clearWines } from "../../../actions/action";

// FIXME: Apply dispatcher instead of store.

const INITIAL_STATE = {
  wineName: "",
  wineType: "",
  wineFromYear: "",
  wineToYear: "",
};

class WineFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }

  // TODO: SET UP DISPATCHER INSTEAD OF IMPORTING STORE.
  onSubmit(event) {
    event.preventDefault();
    this.props.firebase.database
      .ref("wines")
      .once("value")
      .then(wineItemsSnapshot => {
        store.dispatch(
          setWines(this.props.firebase.snapshotToArray(wineItemsSnapshot))
        );
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClear = event => {
    event.preventDefault();
    store.dispatch(clearWines());
  };

  render() {
    const { wineName, wineFromYear, wineToYear } = this.state;
    return (
      <div className="wine-form">
        <form onSubmit={e => this.onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="wineName">Søk på navn</label>
            <input
              type="text"
              name="wineName"
              className="form-control"
              value={wineName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="wineType">Filtrer på type</label>
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
            <label htmlFor="wineYear">Filtrer på årstall</label>
            <input
              pattern="[0-9]{4}"
              title="fromYear"
              className="form-control"
              name="wineFromYear"
              placeholder="From"
              value={wineFromYear}
              onChange={this.onChange}
            />
            <input
              pattern="[0-9]{4}"
              title="toYear"
              className="form-control"
              name="wineToYear"
              placeholder="To"
              value={wineToYear}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fitsTo">Hva passer vinen til?</label>
            <select
              className="custom-select custom-select-xl-1 mb-1"
              name="fitsTo"
              onChange={this.onChange}
            >
              <option value="RED">Pizza</option>
              <option value="WHITE">Pasta</option>
              <option value="ROSÉ">Sjømat osv..</option>
            </select>
          </div>
          <button type="submit" className="addWineButton btn btn-primary">
            List wines
          </button>
          <button
            type="submit"
            onClick={e => this.onClear(e)}
            className="addWineButton btn btn-danger"
          >
            Clear search
          </button>
        </form>
      </div>
    );
  }
}

export default withFirebase(WineFormComponent);
