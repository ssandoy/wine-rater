import ACTIONS from "actions/action";

const INITIAL_STATE = {
  allWines: [],
  hasSearched: false,
  wineItems: []
};

export default function wineReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.TYPES.SET_WINES: {
      const wineItems = action.data;
      return {
        ...state,
        wineItems: wineItems,
        hasSearched: true
      };
    }
    case ACTIONS.TYPES.SET_ALL_WINES: {
      const wineItems = action.data;
      return {
        ...state,
        allWines: wineItems
      };
    }
    case ACTIONS.TYPES.CLEAR_WINES: {
      return {
        ...state,
        wineItems: [],
        hasSearched: false
      };
    }
    default:
      return state;
  }
}
