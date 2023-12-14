import React from "react";
import {Navigate, redirect, Route} from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { LOGIN_ROUTE } from "./routes";

interface Props {
  component: React.FC;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}: Props) => {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
     return <Navigate to={LOGIN_ROUTE} />;
  }

  return (
    <Route {...rest}>
      <Component  />
    </Route>
  );
};

export default PrivateRoute;
