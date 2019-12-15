import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import "./App.scss";
import AddWineForm from "components/add-wine/AddWineForm";
import WineSearchComponent from "components/search/winesearch";
import NotFoundComponent from "components/notfound/notfound";
import logo from "./logo.png";
import PropTypes from "prop-types";
import * as dispatchers from "dispatchers";
import { withFirebase } from "firebase/index";
import Wine from "models/wine";
import { connect } from "react-redux";

const App = props => {
  document.title = "Vinolini";

  useEffect(() => {
    props.firebase.database
      .ref("wines")
      .once("value")
      .then((wineItemsSnapshot: any) => {
        props.setAllWines(
          props.firebase
            .snapshotToArray(wineItemsSnapshot)
            .map((item: Wine) => item)
        );
      });
  }, [props]);

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <NavLink to="/wines/">
            <img src={logo} className="App-logo" alt="logo" />
          </NavLink>
          <div className="app-navbar">
            <NavLink
              exact
              to="/wines/"
              style={{ color: "white" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Legg til vin
            </NavLink>
            <NavLink
              exact
              to="/wines/search"
              style={{ color: "white" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Søk på viner
            </NavLink>
          </div>
        </div>
        <div className="container">
          <Switch>
            <Route exact path={["/wines", "/"]} component={AddWineForm} />
            <Route path="/wines/search" component={WineSearchComponent} />.
            <Route component={NotFoundComponent} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

App.propTypes = {
  allWines: PropTypes.array,
  setAllWines: PropTypes.func,
  firebase: PropTypes.object
};

const mapStateToProps = (state: any) => ({
  allWines: state.allWines
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      setAllWines: dispatchers.setAllWines
    }
  )(App)
);
