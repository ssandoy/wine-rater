import { signInWithEmailAndPassword } from "firebase/auth";
import type React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { useFirebaseContext } from "../../firebase";
import { ADD_WINE_ROUTE } from "../../routes/routes";
import Spinner from "../spinner/Spinner";
import styles from "./login.module.css";

const LoginComponent = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { isAuthReady, isLoggedIn } = useAppContext();
  const { auth } = useFirebaseContext();
  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoggingIn(true);
    setError(null);
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        "sanderfsandoy@gmail.com",
        inputPassword
      );
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

  if (!isAuthReady) {
    return (
      <div className={styles["login-spinner-container"]} role="status">
        Sjekker innlogging... <Spinner />
      </div>
    );
  }

  return isLoggedIn ? (
    <Navigate to={ADD_WINE_ROUTE} replace />
  ) : (
    <div className={styles["login-container"]}>
      <h4 className={`page-title ${styles["login-title"]}`}>
        Du må logge inn for å legge til nye viner!
      </h4>
      <form className={styles["login-form-container"]} onSubmit={login}>
        <label htmlFor="password">Passord </label>
        <input
          id="password"
          className={styles["login-input"]}
          type="password"
          onChange={(event) => setInputPassword(event.target.value)}
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
