import { type Auth, onAuthStateChanged } from "firebase/auth";
import type { Database } from "firebase/database";
import type { FirebaseStorage } from "firebase/storage";
import { createContext, type PropsWithChildren, use, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { auth, db, storage } from "./firebase-setup";

type State = {
  database: Database;
  storage: FirebaseStorage;
  auth: Auth;
};

const FirebaseContext = createContext<State | undefined>(undefined);
const firebaseServices: State = { database: db, storage, auth };

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const { setIsAuthReady, setIsLoggedIn } = useAppContext();

  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        (user) => {
          setIsLoggedIn(Boolean(user));
          setIsAuthReady(true);
        },
        (error) => {
          console.error("Failed to determine authentication state", error);
          setIsLoggedIn(false);
          setIsAuthReady(true);
        }
      ),
    [setIsAuthReady, setIsLoggedIn]
  );

  return <FirebaseContext value={firebaseServices}>{children}</FirebaseContext>;
};

const useFirebaseContext = () => {
  const context = use(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebaseContext must be used within a FirebaseProvider"
    );
  }
  return context;
};

export { FirebaseProvider, useFirebaseContext };
