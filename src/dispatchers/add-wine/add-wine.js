import ACTIONS from "../../actions/action";

export const addWineToWineList = wineItem => dispatch => {
  console.log(wineItem);
  dispatch(ACTIONS.appendWine(wineItem));
};
