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
import LookUpComponent from "components/lookup/LookUpComponent";
import logo from "./logo.png";
import PropTypes from "prop-types";
import * as dispatchers from "dispatchers";
import { withFirebase } from "firebase/index";
import Wine from "models/wine";
import { connect } from "react-redux";
import LoginComponent from "./components/login";
import PrivateRoute from "./routes";

const App = props => {
  document.title = "Vinolini";

  useEffect(() => {
    props.firebase.database
      .ref("wines")
      .once("value")
      .then((wineItemsSnapshot: any) => {
        const allWines = props.firebase
          .snapshotToArray(wineItemsSnapshot)
          .map((item: Wine) => item);
        props.setAllWines(allWines);
        props.setWines(allWines);
      });
  }, [props.wineRegistered]);

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <NavLink to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </NavLink>
          <div className="app-navbar">
            <NavLink
              exact
              to="/search"
              style={{ color: "white" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Søk på viner
            </NavLink>
            <NavLink
              exact
              to="/lookup"
              style={{ color: "white" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Detaljer
            </NavLink>
            <NavLink
              exact
              to="/add"
              style={{ color: "white" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Legg til vin
            </NavLink>
          </div>
        </div>
        <div className="container">
          <Switch>
            <PrivateRoute exact path={"/add"} component={AddWineForm} />
            <Route
              exact
              path={["/", "/search"]}
              component={WineSearchComponent}
            />
            <Route exact path={"/login"} component={LoginComponent} />
            <Route exact path={"/lookup"} component={LookUpComponent} />
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
  wineRegistered: PropTypes.bool,
  firebase: PropTypes.object
};

const mapStateToProps = (state: any) => ({
  allWines: state.wineReducer.allWines,
  wineRegistered: state.wineReducer.wineRegistered
});

export default withFirebase(
  connect(
    mapStateToProps,
    {
      setAllWines: dispatchers.setAllWines,
      setWines: dispatchers.setWines
    }
  )(App)
);
