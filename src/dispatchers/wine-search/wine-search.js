import actions from "actions/action";

export const setWineItems = wineItems => dispatch =>
  dispatch(actions.setWineItems(wineItems));

export const setAllWines = wineItems => dispatch =>
  dispatch(actions.setAllWines(wineItems));
