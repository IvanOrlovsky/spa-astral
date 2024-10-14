import { Dispatch } from "redux";
import { actionType } from "../../types/action";
import axios from "axios";
import { Actions } from "./types";
import Cookies from "js-cookie";

export const setUser = () => async (dipatch: Dispatch<actionType>) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_USER_API as string,
			{
				headers: {
					Authorization:
						Cookies.get("access_token") ||
						localStorage.getItem("access_token"),
				},
			}
		);

		return dipatch({
			type: Actions.SET_USER,
			payload: response.data.cards,
		});
	} catch (err) {
		return dipatch({
			type: Actions.OPEN_ALERT,
			payload: {
				errorMessage:
					"Произошла непредвиденная ошибка при получении данных пользователя!",
			},
		});
	}
};
