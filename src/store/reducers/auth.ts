import { actionType } from "../../types/action";
import { Types } from "../actions/types";

const defaultState: {
	accessToken: string | null;
} = {
	accessToken: null,
};

export function authReducer() {
	return (state = defaultState, action: actionType) => {
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
	};
}
