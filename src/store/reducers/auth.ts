import { actionType } from "../../types/action";
import { Actions } from "../actions/types";

export type authStateType = {
	accessToken: string | null;
};

const defaultState: authStateType = {
	accessToken: null,
};

export function authReducer(
	state = defaultState,
	action: actionType
): authStateType {
	switch (action.type) {
		case Actions.AUTH_SUCCESS:
			return {
				...state,
				accessToken: action.payload,
			};
		case Actions.AUTH_FAILURE:
			return {
				...state,
				accessToken: null,
			};
		case Actions.LOGOUT:
			return {
				...state,
				accessToken: null,
			};
		default:
			return state;
	}
}
