import actions from "../../actions/action";

export const setWines = wineItems => dispatch =>
  dispatch(actions.setWines(wineItems));

export const clearWines = wineItems => dispatch =>
  dispatch(actions.clearWines());
