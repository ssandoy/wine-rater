import React, { useState } from "react";
import { clearWines, setWines } from "../../../actions/action";
import { withFirebase } from "../../../firebase";
import store from "../../../store";

const WineSearchFormComponent = props => {
  // TODO: SET UP DISPATCHER INSTEAD OF IMPORTING STORE.
  const [wineName, setWineName] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineFromYear, setWineFromYear] = useState("");
  const [wineToYear, setWineToYear] = useState("");
  const [fitsTo, setFitsTo] = useState([]);

  const onSubmit = event => {
    event.preventDefault();
    props.firebase.database
      .ref("wines")
      .once("value")
      .then(wineItemsSnapshot => {
        store.dispatch(
          setWines(props.firebase.snapshotToArray(wineItemsSnapshot))
        );
      });
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

  const onClear = event => {
    event.preventDefault();
    store.dispatch(clearWines());
  };
  console.log(wineName);
  return (
    <div className="wine-form">
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="wineName">Søk på navn</label>
          <input
            type="text"
            name="wineName"
            className="form-control"
            value={wineName}
            onChange={e => setWineName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="wineType">Filtrer på type</label>
          <select
            className="custom-select custom-select-xl-1 mb-1"
            name="wineType"
            onChange={e => setWineType(e.target.value)}
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
            onChange={e => setWineFromYear(e.target.value)}
          />
          <input
            pattern="[0-9]{4}"
            title="toYear"
            className="form-control"
            name="wineToYear"
            placeholder="To"
            value={wineToYear}
            onChange={e => setWineToYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fitsTo">Hva passer vinen til?</label>
          <select
            className="custom-select custom-select-xl-1 mb-1"
            name="fitsTo"
            onChange={e => setFitsTo(e.target.value)}
          >
            <option value="pizza">Pizza</option>
            <option value="pasta">Pasta</option>
            <option value="seafood">Sjømat osv..</option>
          </select>
        </div>
        <button type="submit" className="addWineButton btn btn-primary">
          List wines
        </button>
        <button
          type="submit"
          onClick={e => onClear(e)}
          className="addWineButton btn btn-danger"
        >
          Clear search
        </button>
      </form>
    </div>
  );
};

export default withFirebase(WineSearchFormComponent);
