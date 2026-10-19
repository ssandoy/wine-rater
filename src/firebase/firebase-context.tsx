import { type Auth, onAuthStateChanged } from "firebase/auth";
import type { Database } from "firebase/database";
import type { FirebaseStorage } from "firebase/storage";
import {
  createContext,
  type PropsWithChildren,
  use,
  useEffect,
  useState,
} from "react";
import { auth, db, storage } from "./firebase-setup";

type State = {
  database: Database;
  storage: FirebaseStorage;
  auth: Auth;
};

type AuthState = {
  status: "loading" | "signedIn" | "signedOut";
};

const FirebaseContext = createContext<State | undefined>(undefined);
const AuthContext = createContext<AuthState | undefined>(undefined);
const firebaseServices: State = { database: db, storage, auth };

const FirebaseProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthState["status"]>("loading");

  useEffect(
    () =>
      onAuthStateChanged(
        auth,
        (user) => setAuthStatus(user ? "signedIn" : "signedOut"),
        (error) => {
          console.error("Failed to determine authentication state", error);
          setAuthStatus("signedOut");
        }
      ),
    []
  );

  return (
    <FirebaseContext value={firebaseServices}>
      <AuthContext value={{ status: authStatus }}>{children}</AuthContext>
    </FirebaseContext>
  );
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

const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }
  return context;
};

export { FirebaseProvider, useAuth, useFirebaseContext };
