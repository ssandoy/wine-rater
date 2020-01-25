import ACTIONS from "actions/action";

export const loginFirebase = (password, firebase) => async dispatch => {
  // TODO UPDATE WITH FIREBASE AUTH...
  const isLoggedIn = password === process.env.REACT_APP_MOCK_PASSWORD;
  // const isLoggedIn = await firebase.login(password);
  dispatch(ACTIONS.login(isLoggedIn));
  return isLoggedIn;
};
