import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { LOGIN_ROUTE } from "./routes";

interface Props {
  component: React.FC;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}: Props) => {
  const { isLoggedIn } = useAppContext();
  return (
    <Route {...rest}>
      {props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={LOGIN_ROUTE} />
      }
    </Route>
  );
};

export default PrivateRoute;
