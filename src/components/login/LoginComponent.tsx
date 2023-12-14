import React, {useState} from "react";
import "./login.scss";
import {useAppContext} from "../../context/AppContext";
import {ADD_WINE_ROUTE} from "../../routes/routes";
import {useFirebaseContext} from "../../firebase";
import Spinner from "../spinner/Spinner";
import {signInWithEmailAndPassword} from "firebase/auth";
import {Navigate} from "react-router-dom";

const LoginComponent = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAppContext();
  const { auth } = useFirebaseContext();
  const login = event => {
    setIsLoggingIn(true);
    event.preventDefault();
      signInWithEmailAndPassword(auth,"sanderfsandoy@gmail.com", inputPassword)
      .then(() => {
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setIsLoggingIn(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to={ADD_WINE_ROUTE}/>
  }

  return (
    <div className="login-container">
      <h4 className="page-title login-title">
        Du må logge inn for å legge til nye viner!
      </h4>
      <form className="login-form-container" onSubmit={login}>
        <label>Passord </label>
        <input
          className="login-input"
          type="password"
          onChange={event => setInputPassword(event.target.value)}
        />
        <button className="login-button" type="submit">
          Logg inn
        </button>
        {isLoggingIn && (
          <div className="login-spinner-container">
            Logger inn... <Spinner dark={true} />
          </div>
        )}
        {error && <p className="login-hasError">Feil passord!</p>}
      </form>
    </div>
  );
};

export default LoginComponent;
