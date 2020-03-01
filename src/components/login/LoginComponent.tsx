import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as dispatchers from "dispatchers";
import "./login.scss";
import PropTypes from "prop-types";

const LoginComponent = ({ isLoggedIn, loginFirebase }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const login = event => {
    event.preventDefault();
    const isLoggedIn = loginFirebase(inputPassword);
    setHasError(isLoggedIn);
  };

  return isLoggedIn ? (
    <Redirect to="/add" />
  ) : (
    <div className="login-container">
      <h4 className="page-title login-title">
        Du må logge inn for å legge til nye viner!
      </h4>
      <form className="login-form-container" onSubmit={login}>
        <label>Passord </label>
        <input
          className="login-input"
          type="password"
          value={inputPassword}
          onChange={event => setInputPassword(event.target.value)}
        />
        <button className="login-button" type="submit">
          Logg inn
        </button>
        {hasError && <p className="login-hasError">Feil passord!</p>}
      </form>
    </div>
  );
};

LoginComponent.propTypes = {
  isLoggedIn: PropTypes.bool,
  loginFirebase: PropTypes.func
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn
  };
};

export default connect(mapStateToProps, {
  loginFirebase: dispatchers.loginFirebase
})(LoginComponent);
