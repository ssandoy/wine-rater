import { applyMiddleware, createStore } from "redux";
import thunkMiddleWare from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;
