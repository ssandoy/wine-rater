import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from 'redux-devtools-extension';

// Logger with default options
import {createLogger} from "redux-logger";

import wineReducer from "../reducers";

const store = createStore(wineReducer, devToolsEnhancer(
  createLogger
  // other store enhancers if any
));

export default store;