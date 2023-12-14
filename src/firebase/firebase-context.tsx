import React from "react";
import {Database}from  "firebase/database";
import {StorageReference}from  "firebase/storage";
import {Auth} from "firebase/auth";
import { db, auth } from "./firebase-setup";

type State = {
  database: Database;
  storageRef: StorageReference;
  auth: Auth;
};

const FirebaseContext = React.createContext<State | undefined>(undefined);

const FirebaseProvider = props => {
  const value = {
    database: db,
    auth: auth
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
