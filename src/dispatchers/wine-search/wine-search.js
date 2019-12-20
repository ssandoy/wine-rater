import actions from "actions/action";

export const setWines = wineItems => dispatch =>
  dispatch(actions.setWines(wineItems));

export const setAllWines = wineItems => dispatch =>
  dispatch(actions.setAllWines(wineItems));

export const clearFilter = () => dispatch => dispatch(actions.clearFilter());
