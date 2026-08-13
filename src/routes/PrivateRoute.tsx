import React from "react";
import { Navigate } from "react-router";
import { useAppContext } from "../context/AppContext";
import { LOGIN_ROUTE } from "./routes";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthReady, isLoggedIn } = useAppContext();

  if (!isAuthReady) {
    return null;
  }

  return isLoggedIn ? <>{children}</> : <Navigate to={LOGIN_ROUTE} replace />;
};

export default PrivateRoute;
