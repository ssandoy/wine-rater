import React, { useEffect } from "react";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { Database } from "firebase/database";
import { FirebaseStorage } from "firebase/storage";
import { useAppContext } from "../context/AppContext";
import { db, storage, auth } from "./firebase-setup";

type State = {
  database: Database;
  storage: FirebaseStorage;
  auth: Auth;
};

const FirebaseContext = React.createContext<State | undefined>(undefined);
const firebaseServices: State = { database: db, storage, auth };

const FirebaseProvider: React.FC = ({ children }) => {
  const { setIsAuthReady, setIsLoggedIn } = useAppContext();

  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        user => {
          setIsLoggedIn(Boolean(user));
          setIsAuthReady(true);
        },
        error => {
          console.error("Failed to determine authentication state", error);
          setIsLoggedIn(false);
          setIsAuthReady(true);
        }
      ),
    [setIsAuthReady, setIsLoggedIn]
  );

  return (
    <FirebaseContext.Provider value={firebaseServices}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebaseContext = () => {
  const context = React.useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseProvider"
    );
  }
  return context;
};

export { FirebaseProvider, useFirebaseContext };
