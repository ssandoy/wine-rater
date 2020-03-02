import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect, ConnectedComponent } from "react-redux";

interface Props {
  isLoggedIn: boolean;
  component: React.FunctionComponent;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  isLoggedIn,
  component: Component,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loginReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(PrivateRoute);
