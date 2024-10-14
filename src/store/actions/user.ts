import { Dispatch } from "redux";
import { actionType } from "../../types/action";
import axios from "axios";
import { Actions } from "./types";
import Cookies from "js-cookie";
import { userType } from "../../types/user";

export const getUser = () => async (dispatch: Dispatch<actionType>) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_GET_USER_API as string,
			{
				headers: {
					Authorization:
						Cookies.get("access_token") ||
						localStorage.getItem("access_token"),
				},
			}
		);

		return dispatch({
			type: Actions.GET_USER,
			payload: response.data.cards,
		});
	} catch (err) {
		return dispatch({
			type: Actions.OPEN_ALERT,
			payload: {
				errorMessage:
					"Произошла непредвиденная ошибка при получении данных пользователя!",
			},
		});
	}
};

export const setUser =
	(user: userType) => async (dispatch: Dispatch<actionType>) => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_SET_USER_API as string,
				{
					headers: {
						Authorization:
							Cookies.get("access_token") ||
							localStorage.getItem("access_token"),
					},
				}
			);

			if (response.data.message !== "Success") {
				throw new Error();
			}

			return dispatch({
				type: Actions.SET_USER,
				payload: user,
			});
		} catch (err) {
			return dispatch({
				type: Actions.OPEN_ALERT,
				payload: {
					errorMessage:
						"Произошла непредвиденная ошибка при изменении данных пользователя!",
				},
			});
		}
	};
