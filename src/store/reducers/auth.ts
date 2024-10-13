import { actionType } from "../../types/action";
import { Types } from "../actions/types";

type stateType = {
	accessToken: string | null;
};

const defaultState: stateType = {
	accessToken: null,
};

export function authReducer(
	state = defaultState,
	action: actionType
): stateType {
	switch (action.type) {
		case Types.AUTH_SUCCESS:
			return {
				...state,
				accessToken: action.payload,
			};
		case Types.AUTH_FAILURE:
			return {
				...state,
				accessToken: null,
			};
		case Types.LOGOUT:
			return {
				...state,
				accessToken: null,
			};
		default:
			return state;
	}
}
