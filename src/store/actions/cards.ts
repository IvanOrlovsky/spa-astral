import { Dispatch } from "redux";
import { actionType } from "../../types/action";
import axios from "axios";
import { Actions } from "./types";
import Cookies from "js-cookie";

export const getCards = () => async (dipatch: Dispatch<actionType>) => {
	try {
		const response = await axios.get(
			process.env.REACT_APP_CARDS_API as string,
			{
				headers: {
					Authorization:
						Cookies.get("access_token") ||
						sessionStorage.getItem("access_token"),
				},
			}
		);

		return dipatch({
			type: Actions.GET_CARDS,
			payload: response.data.cards,
		});
	} catch (err) {
		console.error(err);
		return dipatch({
			type: Actions.OPEN_ALERT,
			payload: {
				message:
					"Произошла непредвиденная ошибка при получении карточек!",
			},
		});
	}
};
