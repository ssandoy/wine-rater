import ACTIONS from "actions/action";

export const addWineToWineList = wineId => async dispatch => {
  dispatch(ACTIONS.wineRegistered(wineId !== -1));
};

export const resetRegisteredWine = () => dispatch => {
  dispatch(ACTIONS.resetRegistered());
};
