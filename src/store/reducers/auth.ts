import { actionType } from "../../types/action";
import { Actions } from "../actions/types";

export type authStateType = {
	isLoggedIn: boolean;
	errorMessage: string | null;
};

const defaultState: authStateType = {
	isLoggedIn: false,
	errorMessage: null,
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
		case Actions.INVALID_CREDENTIALS:
			return {
				...state,
				errorMessage:
					"Неверные данные для входа! Попробуйте логин: admin, пароль: admin",
			};
		case Actions.AUTH_FAILURE:
			return {
				...state,
				errorMessage: "Произошла непредвиденная ошибка при входе!",
			};
		case Actions.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
			};
		case Actions.CLOSE_ALERT:
			return {
				...state,
				errorMessage: null,
			};
		default:
			return state;
	}
}
