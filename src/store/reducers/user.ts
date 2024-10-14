import { actionType } from "../../types/action";
import { Actions } from "../actions/types";
import { userType } from "../../types/user";

export type userStateType = {
	user: userType | null;
};

const defaultState: userStateType = {
	user: null,
};

export function userReducer(
	state = defaultState,
	action: actionType
): userStateType {
	switch (action.type) {
		case Actions.SET_USER:
			return {
				...state,
				user: action.payload,
			};

		default:
			return state;
	}
}
