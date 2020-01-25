import ACTIONS from "actions/action";

const INITIAL_STATE = {
  isLoggedIn: false
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONS.TYPES.LOGIN: {
      const isLoggedIn = action.data;
      return {
        ...state,
        isLoggedIn: isLoggedIn
      };
    }
    default:
      return state;
  }
}
