//  Types of action. TODO: SEPARATE OUT.
const TYPES = {
  CREATE_WINE: "CREATE_WINE",
  EDIT_WINE: "EDIT_WINE",
  DELETE_WINE: "DELETE_WINE",
  SET_WINES: "SET_WINES",
  CLEAR_WINES: "CLEAR_WINES",
};

// actions 
export function createWine(wine) {
  const action = {
    type: TYPES.CREATE_WINE,
    data: wine,
  }
  return action;
}

export function setWines(wineItems) {
  return {
    type: TYPES.SET_WINES,
    data: wineItems,
  }
}

export function clearWines() {
  return {
    type: TYPES.CLEAR_WINES,
  }
}


export default {
  createWine,
  setWines,
  clearWines,
  TYPES
};