import React from "react";
import firebase from "@firebase/app";
import "@firebase/database";
import "@firebase/storage";
import { db, storage } from "./firebase-setup";

type State = {
  database: firebase.database.Database;
  storageRef: firebase.storage.Reference;
};

const FirebaseContext = React.createContext<State | undefined>(undefined);

const FirebaseProvider = props => {
  const value = {
    database: db,
    storageRef: storage.ref()
  };
  return <FirebaseContext.Provider value={value} {...props} />;
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
