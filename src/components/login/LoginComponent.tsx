import { signInWithEmailAndPassword } from "firebase/auth";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Navigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { useFirebaseContext } from "../../firebase";
import { ADD_WINE_ROUTE } from "../../routes/routes";
import Spinner from "../spinner/Spinner";
import styles from "./login.module.css";

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        className={styles["login-button"]}
        type="submit"
        disabled={pending}
      >
        Logg inn
      </button>
      {pending && (
        <div className={styles["login-spinner-container"]}>
          Logger inn... <Spinner dark={true} />
        </div>
      )}
    </>
  );
};

const LoginComponent = () => {
  const { isAuthReady, isLoggedIn } = useAppContext();
  const { auth } = useFirebaseContext();
  const login = async (
    _previousError: string | null,
    formData: FormData
  ): Promise<string | null> => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "sanderfsandoy@gmail.com",
        String(formData.get("password") ?? "")
      );
      return null;
    } catch (loginError) {
      console.error("Login failed", loginError);
      const errorCode = (loginError as { code?: string }).code;
      return errorCode === "auth/wrong-password" ||
        errorCode === "auth/invalid-credential"
        ? "Feil passord!"
        : "Kunne ikke logge inn. Kontroller nettverkstilkoblingen og prøv igjen.";
    }
  };
  const [error, loginAction, isLoggingIn] = useActionState(login, null);

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
      <form
        className={styles["login-form-container"]}
        action={loginAction}
        // Keep the typed password after a failed attempt.
        onReset={(event) => event.preventDefault()}
      >
        <label htmlFor="password">Passord </label>
        <input
          id="password"
          name="password"
          className={styles["login-input"]}
          type="password"
        />
        <LoginButton />
        {!isLoggingIn && error && (
          <p className={styles["login-hasError"]} role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginComponent;
