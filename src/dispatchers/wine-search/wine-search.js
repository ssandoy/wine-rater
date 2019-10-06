import actions from "../../actions/action";

export const setWineItems = wineItems => dispatch =>
  dispatch(actions.setWines(wineItems));
