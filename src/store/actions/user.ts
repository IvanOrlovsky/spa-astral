import { Dispatch } from "redux";
import { actionType } from "../../types/action";
import axios from "axios";
import { Actions } from "./types";
import Cookies from "js-cookie";
import { userType } from "../../types/user";

export const updateUser =
	(newUserData: userType) => async (dispatch: Dispatch<actionType>) => {
		try {
			const response = await axios.post(
				process.env.REACT_APP_UPDATE_USER_API ||
					"https://demo6972685.mockable.io/user",
				{
					headers: {
						Authorization:
							Cookies.get("access_token") ||
							sessionStorage.getItem("access_token"),
					},
				}
			);

			if (response.data.message !== "Success") {
				throw new Error();
			}

			dispatch({
				type: Actions.OPEN_ALERT,
				payload: {
					message: "Новые данные успешно сохранены!",
					severity: "success",
				},
			});

			return dispatch({
				type: Actions.UPDATE_USER,
				payload: newUserData,
			});
		} catch (err) {
			return dispatch({
				type: Actions.OPEN_ALERT,
				payload: {
					message:
						"Произошла непредвиденная ошибка при получении данных пользователя!",
				},
			});
		}
	};

export const setUser = (user: userType) => ({
	type: Actions.SET_USER,
	payload: user,
});

export const getUser = () => async (dispatch: Dispatch<actionType>) => {
	const userResponse = await axios.get(
		process.env.REACT_APP_SET_USER_API ||
			"https://demo6972685.mockable.io/user",
		{
			headers: {
				Authorization:
					Cookies.get("access_token") ||
					sessionStorage.getItem("access_token"),
			},
		}
	);

	return dispatch({
		type: Actions.SET_USER,
		payload: userResponse.data,
	});
};

export const deleteUser = () => ({
	type: Actions.DELETE_USER,
});
