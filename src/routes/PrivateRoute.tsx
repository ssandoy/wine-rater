import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

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
