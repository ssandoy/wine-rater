import React from "react";
import App from "App";
import "./styles.scss";
import { FirebaseProvider } from "./firebase";
import { AppProvider } from "./context/AppContext";
import {createRoot} from "react-dom/client";

const domNode = document.getElementById('root');


// @ts-expect-error err FIXME
createRoot(domNode).render(
  <AppProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </AppProvider>,
);
