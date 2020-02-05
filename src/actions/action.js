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

export function setWineItems(wineItems) {
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

export function login(isLoggedIn) {
  return {
    type: TYPES.LOGIN,
    data: isLoggedIn
  };
}

export default {
  wineRegistered,
  resetRegistered,
  setAllWines,
  setWineItems,
  login,
  TYPES
};
