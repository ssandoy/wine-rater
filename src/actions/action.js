import { TYPES } from "./action-types";

// actions
export function setWines(wineItems) {
  return {
    type: TYPES.SET_WINES,
    data: wineItems
  };
}

export function setAllWines(wineItems) {
  return {
    type: TYPES.SET_ALL_WINES,
    data: wineItems
  };
}

export function clearWines() {
  return {
    type: TYPES.CLEAR_WINES
  };
}

export default {
  setAllWines,
  setWines,
  clearWines,
  TYPES
};
