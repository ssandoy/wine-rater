import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styles from "./login.module.css";
import { useAppContext } from "../../context/AppContext";
import { ADD_WINE_ROUTE } from "../../routes/routes";
import { useFirebaseContext } from "../../firebase";
import Spinner from "../spinner/Spinner";

const LoginComponent = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const { auth } = useFirebaseContext();
  const login = event => {
    setIsLoggingIn(true);
    event.preventDefault();
    auth
      .signInWithEmailAndPassword("sanderfsandoy@gmail.com", inputPassword)
      .then(userCredential => {
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setIsLoggingIn(false);
      });
  };

  return isLoggedIn ? (
    <Redirect to={ADD_WINE_ROUTE} />
  ) : (
    <div className={styles["login-container"]}>
      <h4 className={`page-title ${styles["login-title"]}`}>
        Du må logge inn for å legge til nye viner!
      </h4>
      <form className={styles["login-form-container"]} onSubmit={login}>
        <label>Passord </label>
        <input
          className={styles["login-input"]}
          type="password"
          onChange={event => setInputPassword(event.target.value)}
        />
        <button className={styles["login-button"]} type="submit">
          Logg inn
        </button>
        {isLoggingIn && (
          <div className={styles["login-spinner-container"]}>
            Logger inn... <Spinner dark={true} />
          </div>
        )}
        {error && <p className={styles["login-hasError"]}>Feil passord!</p>}
      </form>
    </div>
  );
};

export default LoginComponent;
