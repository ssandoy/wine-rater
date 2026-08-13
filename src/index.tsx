import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import "./styles/tokens.css";
import "./styles/global.css";
import { FirebaseProvider } from "./firebase";
import { AppProvider } from "./context/AppContext";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find the application root element");
}

createRoot(rootElement).render(
  <AppProvider>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </AppProvider>
);
