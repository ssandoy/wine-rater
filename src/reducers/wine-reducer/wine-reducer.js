import ACTIONS from "../../actions/action";

// TODO: LOAD WHEN FETCH ETC.
const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  wineItems: [],
  error: null,
};

export default function wineReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // TODO: IS THIS NEEDED?
    case ACTIONS.TYPES.CREATE_WINE: {
      const item = action.data;

      const newItem = {
        id: state.wineItems.length + 1,
        description: item,
      };
      return {
        ...state,
        wineItems: state.wineItems.concat(newItem),
      };
    }
    case ACTIONS.TYPES.APPEND_WINE: {
      const wineItem = action.data;
      return {
        ...state,
        wineItems: state.wineItems.concat(wineItem),
      };
      // TODO: SET FETCHING TO FALSE ETC.
    }
    case ACTIONS.TYPES.SET_WINES: {
      const wineItems = action.data;
      return {
        ...state,
        wineItems: wineItems,
      };
    }
    case ACTIONS.TYPES.CLEAR_WINES: {
      return {
        ...state,
        wineItems: [],
      };
    }
    default:
      return state;
  }
}
