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

export function clearFilter() {
  return {
    type: TYPES.CLEAR_FILTER
  };
}

export default {
  wineRegistered,
  resetRegistered,
  setAllWines,
  setWines,
  clearFilter,
  TYPES
};
