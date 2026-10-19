import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  use,
  useState,
} from "react";
import type Wine from "../models/wine";

type AppState = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  isAuthReady: boolean;
  setIsAuthReady: Dispatch<SetStateAction<boolean>>;
  allWines: Wine[];
  setAllWines: Dispatch<SetStateAction<Wine[]>>;
  filteredWines: Wine[];
  setFilteredWines: Dispatch<SetStateAction<Wine[]>>;
  isFetchingWines: boolean;
  setIsFetchingWines: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppState | undefined>(undefined);

const AppProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [isFetchingWines, setIsFetchingWines] = useState(false);

  const value: AppState = {
    isLoggedIn,
    setIsLoggedIn,
    isAuthReady,
    setIsAuthReady,
    allWines,
    setAllWines,
    filteredWines,
    setFilteredWines,
    isFetchingWines,
    setIsFetchingWines,
  };

  return <AppContext value={value}>{children}</AppContext>;
};

const useAppContext = () => {
  const context = use(AppContext);
  if (!context) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  return context;
};

export { AppProvider, useAppContext };
