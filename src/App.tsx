import React, { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
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
import Wine from "models/wine";
import LoginComponent from "./components/login";
import PrivateRoute from "./routes";
import { WineSearchPage } from "./components/search/WineSearchPage";
import LogoIcon from "./icons/LogoIcon";
import { useFirebaseContext } from "./firebase";
import { snapshotToArray } from "./firebase/firebase-setup";
import { INDICES } from "./firebase/indices";
import { useAppContext } from "./context/AppContext";
import {
  ADD_WINE_ROUTE,
  DETAILS_ROUTE,
  LOGIN_ROUTE,
  SEARCH_ROUTE,
  SUGGESTER_ROUTE
} from "./routes/routes";
import WineSuggesterPage from "./features/wine-suggester/WineSuggesterPage";
import { WineNavLink } from "./WineNavLink";
import { isNative } from "./utils/window-utils";

const App = () => {
  document.title = "Vinolini";

  const { setAllWines, setIsFetchingWines, setFilteredWines } = useAppContext();
  const firebase = useFirebaseContext();
  // todo isNative
  const [shouldShowNavbar, setShouldShowNavbar] = useState(
    isNative() ? false : true
  );

  useEffect(() => {
    setIsFetchingWines(true);
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
        setFilteredWines(allWines);
        setIsFetchingWines(false);
      });
  }, [firebase, setAllWines, setFilteredWines, setIsFetchingWines]);

  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <div className="app-header-icon">
            <NavLink to={SEARCH_ROUTE}>
              <LogoIcon />
            </NavLink>
          </div>
          <div className="app-navbar">
            {isNative() && (
              <Hamburger
                color="white"
                toggled={shouldShowNavbar}
                toggle={setShouldShowNavbar}
              />
            )}
            {shouldShowNavbar ? (
              <>
                <WineNavLink route={SEARCH_ROUTE} title="Våre viner" />
                <WineNavLink route={DETAILS_ROUTE} title="Søk" />
                <WineNavLink route={SUGGESTER_ROUTE} title="Vinforslag" />
                <WineNavLink route={ADD_WINE_ROUTE} title="Legg til" />
              </>
            ) : null}
          </div>
        </div>
        <>
          <Switch>
            <PrivateRoute exact path={ADD_WINE_ROUTE} component={AddWineForm} />
            <Route
              exact
              path={["/", SEARCH_ROUTE]}
              component={WineSearchPage}
            />
            <Route exact path={LOGIN_ROUTE} component={LoginComponent} />
            <Route exact path={DETAILS_ROUTE} component={LookUpComponent} />
            <Route exact path={SUGGESTER_ROUTE} component={WineSuggesterPage} />
            <Route component={NotFoundComponent} />
          </Switch>
        </>
      </div>
    </Router>
  );
};

export default App;
