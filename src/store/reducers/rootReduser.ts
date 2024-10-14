import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { cardsReducer } from "./cards";

export const rootReducer = combineReducers({
	auth: authReducer,
	cards: cardsReducer,
});
