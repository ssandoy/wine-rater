import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import "./styles.scss";
import { FirebaseProvider } from "./firebase";
import { AppProvider } from "./context/AppContext";

ReactDOM.render(
  <AppProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </AppProvider>,
  document.getElementById("root")
);
