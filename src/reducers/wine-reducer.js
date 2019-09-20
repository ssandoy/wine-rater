import ACTIONS from '../actions/action'
import _ from 'lodash'

// TODO: LOAD WHEN FETCH ETC. 
const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  wineItems: [],
  error: null,
};


const wineReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.TYPES.CREATE_WINE: {
      const item = action.data;
      
      const newItem = { 
        id: state.wineItems.length + 1, 
        description: item 
      };
      return {
        ...state,
        wineItems: state.wineItems.concat(newItem),
      }
    }
    case ACTIONS.TYPES.DELETE_WINE: {
        // TODO: SET FETCHING TO FALSE ETC. 
    }
    case ACTIONS.TYPES.SET_WINES: {
        console.log(action);
        const wineItems = action.data;
        return {
          ...state,
          wineItems: wineItems,
        }
    }
    case ACTIONS.TYPES.CLEAR_WINES: {
      return {
        ...state,
        wineItems: [],
      }
    }
    default:
      return state;
  }
};

export default wineReducer;
