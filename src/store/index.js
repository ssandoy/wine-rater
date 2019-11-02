import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleWare from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(
		rootReducer,
		compose(
				applyMiddleware(thunkMiddleWare),
				window.devToolsExtension ? window.devToolsExtension() : f => f
		)
);
export default store;
