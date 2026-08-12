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
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const { auth } = useFirebaseContext();
  const login = async event => {
    setIsLoggingIn(true);
    setError(null);
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        "sanderfsandoy@gmail.com",
        inputPassword
      );
      setIsLoggedIn(true);
    } catch (loginError) {
      console.error("Login failed", loginError);
      const errorCode = (loginError as { code?: string }).code;
      setError(
        errorCode === "auth/wrong-password" ||
          errorCode === "auth/invalid-credential"
          ? "Feil passord!"
          : "Kunne ikke logge inn. Kontroller nettverkstilkoblingen og prøv igjen."
      );
    } finally {
      setIsLoggingIn(false);
    }
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
        <button
          className={styles["login-button"]}
          type="submit"
          disabled={isLoggingIn}
        >
          Logg inn
        </button>
        {isLoggingIn && (
          <div className={styles["login-spinner-container"]}>
            Logger inn... <Spinner dark={true} />
          </div>
        )}
        {error && (
          <p className={styles["login-hasError"]} role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginComponent;
