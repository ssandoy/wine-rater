import ACTIONS from "actions/action";

const INITIAL_STATE = {
  allWines: [],
  wineItems: [],
  hasFetchedAllWines: false,
  wineRegistered: false
};

export default function wineReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.TYPES.SET_WINES: {
      const wineItems = action.data;
      return {
        ...state,
        wineItems: wineItems
      };
    }
    case ACTIONS.TYPES.SET_ALL_WINES: {
      const wineItems = action.data;
      return {
        ...state,
        allWines: wineItems,
        hasFetchedAllWines: true
      };
    }
    case ACTIONS.TYPES.CLEAR_FILTER: {
      return {
        ...state,
        wineItems: state.allWines
      };
    }
    case ACTIONS.TYPES.CONFIRM_REGISTERED: {
      return {
        ...state,
        wineRegistered: action.data
      };
    }
    case ACTIONS.TYPES.RESET_REGISTERED: {
      return {
        ...state,
        wineRegistered: action.data
      };
    }
    default:
      return state;
  }
}
