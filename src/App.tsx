import React, { useEffect, useState } from "react";
import { DataSnapshot, get, ref } from "firebase/database";
import { Squash as Hamburger } from "hamburger-react";
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router";
import styles from "./App.module.css";
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

const WINE_FETCH_TIMEOUT_MS = 10_000;

const App = () => {
  document.title = "Vinolini";

  const { setAllWines, setIsFetchingWines, setFilteredWines } = useAppContext();
  const firebase = useFirebaseContext();
  // todo isNative
  const [shouldShowNavbar, setShouldShowNavbar] = useState(
    isNative() ? false : true
  );
  const [wineFetchError, setWineFetchError] = useState(false);
  const [wineFetchAttempt, setWineFetchAttempt] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;
    let hasFinished = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finishWithError = (error: unknown) => {
      if (!isCurrentRequest || hasFinished) {
        return;
      }

      hasFinished = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      console.error("Failed to fetch saved wines", error);
      setWineFetchError(true);
      setIsFetchingWines(false);
    };

    setIsFetchingWines(true);
    setWineFetchError(false);
    timeoutId = setTimeout(
      () => finishWithError(new Error("Wine request timed out")),
      WINE_FETCH_TIMEOUT_MS
    );

    get(ref(firebase.database, INDICES.WINES_INDEX))
      .then((wineItemsSnapshot: DataSnapshot) => {
        if (!isCurrentRequest || hasFinished) {
          return;
        }

        hasFinished = true;
        clearTimeout(timeoutId);
        const allWines = snapshotToArray<Wine>(wineItemsSnapshot).sort(function(
          obj1: Wine,
          obj2: Wine
        ) {
          return (
            +obj2.sanderRating +
            +obj2.ineRating -
            (+obj1.sanderRating + +obj1.ineRating)
          );
        });
        setAllWines(allWines);
        setFilteredWines(allWines);
        setIsFetchingWines(false);
      })
      .catch(finishWithError);

    return () => {
      isCurrentRequest = false;
      clearTimeout(timeoutId);
    };
  }, [
    firebase,
    setAllWines,
    setFilteredWines,
    setIsFetchingWines,
    wineFetchAttempt
  ]);

  const wineSearchRoute = wineFetchError ? (
    <div className={styles["app-request-error-page"]}>
      <h1 className="page-title">Lagrede viner</h1>
      <section
        className={styles["app-request-error"]}
        role="alert"
        aria-labelledby="wine-fetch-error-title"
      >
        <h2
          id="wine-fetch-error-title"
          className={styles["app-request-error__title"]}
        >
          Kunne ikke hente vinene
        </h2>
        <p className={styles["app-request-error__message"]}>
          Sjekk nettverkstilkoblingen din og prøv på nytt.
        </p>
        <button
          type="button"
          className={styles["app-request-error__retry"]}
          onClick={() => setWineFetchAttempt(attempt => attempt + 1)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Prøv igjen
        </button>
      </section>
    </div>
  ) : (
    <WineSearchPage />
  );

  return (
    <Router>
      <div className={styles.App}>
        <div className={styles["App-header"]}>
          <div className="app-header-icon">
            <NavLink to={SEARCH_ROUTE}>
              <LogoIcon />
            </NavLink>
          </div>
          <div className={styles["app-navbar"]}>
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
        <Routes>
          <Route
            path={ADD_WINE_ROUTE}
            element={
              <PrivateRoute>
                <AddWineForm />
              </PrivateRoute>
            }
          />
          <Route path="/" element={wineSearchRoute} />
          <Route path={SEARCH_ROUTE} element={wineSearchRoute} />
          <Route path={LOGIN_ROUTE} element={<LoginComponent />} />
          <Route path={DETAILS_ROUTE} element={<LookUpComponent />} />
          <Route path={SUGGESTER_ROUTE} element={<WineSuggesterPage />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
