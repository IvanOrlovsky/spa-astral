import { actionType } from "../../types/actionType";
import { Types } from "../actions/types";

const defaultState = {
	isLoggedIn: false,
	user: null,
};

export function authReducer() {
	return (state = defaultState, action: actionType) => {
		switch (action.type) {
			case Types.AUTH_SUCCESS:
				return { ...state, isLoggedIn: true, user: action.payload };
			case Types.AUTH_FAILURE:
				return { ...state, isLoggedIn: false, user: null };
			case Types.LOGOUT:
				return { ...state, isLoggedIn: false, user: null };
			default:
				return state;
		}
	};
}
