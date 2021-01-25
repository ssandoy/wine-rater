import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch
} from "react-router-dom";
import "./App.scss";
import AddWineForm from "components/add-wine/AddWineForm";
import NotFoundComponent from "components/notfound/notfound";
import LookUpComponent from "components/lookup/LookUpComponent";
import PropTypes from "prop-types";
import * as dispatchers from "dispatchers";
import Wine from "models/wine";
import { connect } from "react-redux";
import LoginComponent from "./components/login";
import PrivateRoute from "./routes";
import { WineSearchPage } from "./components/search/WineSearchPage";
import LogoIcon from "./icons/LogoIcon";
import { useFirebaseContext } from "./firebase";
import { snapshotToArray } from "./firebase/firebase-setup";
import { INDICES } from "./firebase/indices";


const App = ({ setAllWines, setWineItems, wineRegistered }) => {
  document.title = "Vinolini";

  const firebase = useFirebaseContext();

  useEffect(() => {
    firebase.database
      .ref(INDICES.WINES_INDEX)
      .once("value")
      .then((wineItemsSnapshot: any) => {
        const allWines = snapshotToArray(wineItemsSnapshot)
          .map((item: Wine) => item)
          .sort(function(obj1: Wine, obj2: Wine) {
            return (
              +obj2.sanderRating +
              +obj2.ineRating -
              (+obj1.sanderRating + +obj1.ineRating)
            );
          });
        setAllWines(allWines);
        setWineItems(allWines);
      });
  }, [firebase, setAllWines, setWineItems, wineRegistered]);

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div className="app-header-icon">
            <NavLink to="/">
              <LogoIcon />
            </NavLink>
          </div>
          <div className="app-navbar">
            <NavLink
              exact
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Søk
            </NavLink>
            <NavLink
              exact
              to="/lookup"
              style={{ color: "white", textDecoration: "none" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Detaljer
            </NavLink>
            <NavLink
              exact
              to="/add"
              style={{ color: "white", textDecoration: "none" }}
              activeStyle={{ color: "white", borderBottom: "1px solid white" }}
            >
              Legg til
            </NavLink>
          </div>
        </div>
        <>
          <Switch>
            <PrivateRoute exact path={"/add"} component={AddWineForm} />
            <Route exact path={"/"} component={WineSearchPage} />
            <Route exact path={"/login"} component={LoginComponent} />
            <Route exact path={"/lookup"} component={LookUpComponent} />
            <Route component={NotFoundComponent} />
          </Switch>
        </>
      </div>
    </Router>
  );
};

App.propTypes = {
  allWines: PropTypes.array,
  setWineItems: PropTypes.func,
  setAllWines: PropTypes.func,
  wineRegistered: PropTypes.bool,
  firebase: PropTypes.object
};

const mapStateToProps = (state: any) => ({
  allWines: state.wineReducer.allWines,
  wineRegistered: state.wineReducer.wineRegistered
});

export default connect(mapStateToProps, {
  setAllWines: dispatchers.setAllWines,
  setWineItems: dispatchers.setWineItems
})(App);
