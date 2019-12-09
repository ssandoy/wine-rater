import ACTIONS from "actions/action";

// TODO: THIS IS HACKY AND I WANT TO REMOVE IT.
export const addWineToWineList = (wineItem, firebase) => async dispatch => {
  const wineId = await firebase.storeWineToFirebase(wineItem);
  dispatch(ACTIONS.wineRegistered(wineId !== -1));
};

export const resetRegisteredWine = () => dispatch => {
  dispatch(ACTIONS.resetRegistered);
};
