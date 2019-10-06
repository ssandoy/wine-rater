import TYPES from "../../actions/action";

export const setWineItems = wineItems => dispatch =>
  dispatch(TYPES.getWines(wineItems));
