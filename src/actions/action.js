import { TYPES } from "./action-types";

// actions
export function createWine(wine) {
  const action = {
    type: TYPES.CREATE_WINE,
    data: wine,
  };
  return action;
}

export function appendWine(wineItem) {
  const action = {
    type: TYPES.APPEND_WINE,
    data: wineItem,
  };
  return action;
}

export function setWines(wineItems) {
  return {
    type: TYPES.SET_WINES,
    data: wineItems,
  };
}

export function setAllWines(wineItems) {
  return {
    type: TYPES.SET_ALL_WINES,
    data: wineItems,
  };
}

export function clearWines() {
  return {
    type: TYPES.CLEAR_WINES,
  };
}

export default {
  createWine,
  setAllWines,
  setWines,
  clearWines,
  appendWine,
  TYPES,
};
