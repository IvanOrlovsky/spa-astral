import Cookies from "js-cookie";
import { actionType } from "../../types/action";
import { Actions } from "../actions/types";

export type authStateType = {
	isLoggedIn: boolean;
};

const defaultState: authStateType = {
	isLoggedIn:
		!!Cookies.get("access_token") ||
		!!sessionStorage.getItem("access_token") ||
		false,
};

export function authReducer(
	state = defaultState,
	action: actionType
): authStateType {
	switch (action.type) {
		case Actions.AUTH_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
			};
		case Actions.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
			};
		default:
			return state;
	}
}
