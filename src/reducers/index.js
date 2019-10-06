import wineReducer from "./wine-reducer";

// TODO: IF MULTILPE REDUCERS, CREATE IN SEPARATE FILES AND APPLY COMBINEREDUCERS FROM REDUX
// TODO: DISPATCH FOR FIREBASE ASYNC?
export default (state, action) => wineReducer(state, action);
