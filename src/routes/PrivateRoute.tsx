import type React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../firebase";
import { LOGIN_ROUTE } from "./routes";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
  const { status } = useAuth();

  if (status === "loading") {
    return null;
  }

  return status === "signedIn" ? (
    children
  ) : (
    <Navigate to={LOGIN_ROUTE} replace />
  );
};

export default PrivateRoute;
