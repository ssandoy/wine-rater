import ACTIONS from "../../actions/action";

// TODO: THIS IS HACKY AND I WANT TO REMOVE IT.
export const addWineToWineList = (wineItem, firebase) => async dispatch => {
  const wineId = await firebase.storeWineToFirebase(wineItem);
  if (wineId !== -1) {
    alert("Wine added!");
    dispatch(ACTIONS.appendWine(wineItem));
  } else {
    alert("write failed");
  }
};
