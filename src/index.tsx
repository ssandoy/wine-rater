import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { Provider } from "react-redux";
import "./styles.scss";
import store from "./store";
import { FirebaseProvider } from "./firebase";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
