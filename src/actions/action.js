import { TYPES } from "./action-types";

// actions
export function wineRegistered(isRegistered) {
  return {
    type: TYPES.CONFIRM_REGISTERED,
    data: isRegistered
  };
}

export function resetRegistered() {
  return {
    type: TYPES.RESET_REGISTERED,
    data: false
  };
}

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
  wineRegistered,
  setAllWines,
  setWines,
  clearWines,
  TYPES
};
