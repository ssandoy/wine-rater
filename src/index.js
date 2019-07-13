import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";
import FirebaseService, { FirebaseContext } from './firebase';


ReactDOM.render(
  <FirebaseContext.Provider value={new FirebaseService()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
