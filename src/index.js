import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.scss";
import store from "./store";
import FirebaseService, { FirebaseContext } from "./firebase";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new FirebaseService()}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
