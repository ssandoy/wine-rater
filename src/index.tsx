import App from "App";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/global.css";
import { WinesProvider } from "./context/WinesContext";
import { FirebaseProvider } from "./firebase";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Could not find the application root element");
}

createRoot(rootElement).render(
  <FirebaseProvider>
    <WinesProvider>
      <App />
    </WinesProvider>
  </FirebaseProvider>
);
