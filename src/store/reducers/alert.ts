import { actionType } from "../../types/action";
import { Actions } from "../actions/types";

export type alertStateType = {
	message: string | null;
	severity?: "error" | "warning" | "info" | "success" | null | undefined;
};

const defaultState: alertStateType = {
	message: null,
	severity: null,
};

export function alertReducer(
	state = defaultState,
	action: actionType
): alertStateType {
	switch (action.type) {
		case Actions.OPEN_ALERT:
			return {
				...state,
				message: action.payload.message,
				severity: action.payload?.severity,
			};
		case Actions.CLOSE_ALERT:
			return {
				...state,
				message: null,
				severity: null,
			};
		default:
			return state;
	}
}
