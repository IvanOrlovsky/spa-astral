import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { cardsReducer } from "./cards";
import { userReducer } from "./user";
import { alertReducer } from "./alert";

export const rootReducer = combineReducers({
	alert: alertReducer,
	auth: authReducer,
	cards: cardsReducer,
	user: userReducer,
});
