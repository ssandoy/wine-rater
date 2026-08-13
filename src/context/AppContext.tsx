import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState
} from "react";
import Wine from "../models/wine";

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

export const AppContext = React.createContext<AppState | undefined>(undefined);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [isFetchingWines, setIsFetchingWines] = useState(false);

  const value: AppState = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isAuthReady,
      setIsAuthReady,
      allWines,
      setAllWines,
      filteredWines,
      setFilteredWines,
      isFetchingWines,
      setIsFetchingWines
    }),
    [allWines, filteredWines, isAuthReady, isFetchingWines, isLoggedIn]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useAppContext must be used within a AppProvider`);
  }
  return context;
};

export { AppProvider, useAppContext };
