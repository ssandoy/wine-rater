import wineReducer from "./wine-reducer";
import loginReducer from "./login-reducer";
import { combineReducers } from "redux";

export default combineReducers({ wineReducer, loginReducer });
