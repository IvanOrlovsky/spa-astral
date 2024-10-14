import { Dispatch } from "redux";
import { actionType } from "../../types/action";

import { Actions } from "./types";
import axios from "axios";

import Cookies from "js-cookie";

export const login =
	(login: string, password: string, remember: string | null) =>
	async (dipatch: Dispatch<actionType>) => {
		if (
			login === process.env.REACT_APP_LOGIN &&
			password === process.env.REACT_APP_PASSWORD
		) {
			try {
				const response = await axios.post(
					process.env.REACT_APP_LOGIN_API as string
				);

				if (remember) {
					Cookies.set("access_token", response.data.accessToken, {
						path: "/",
					});
				} else {
					sessionStorage.setItem(
						"access_token",
						response.data.accessToken
					);
				}

				window.location.href = "/";

				dipatch({
					type: Actions.OPEN_ALERT,
					payload: {
						message: "Вход выполнен успешно!",
						severity: "success",
					},
				});

				return dipatch({
					type: Actions.AUTH_SUCCESS,
					payload: true,
				});
			} catch (err) {
				return dipatch({
					type: Actions.OPEN_ALERT,
					payload: {
						message: "Произошла непредвиденная ошибка при входе!",
					},
				});
			}
		}
		return dipatch({
			type: Actions.OPEN_ALERT,
			payload: {
				message:
					"Неверные данные для входа! Попробуйте логин: admin, пароль: admin",
			},
		});
	};

export const logout = () => {
	if (!!Cookies.get("access_token")) {
		Cookies.remove("access_token");
	}

	if (!!sessionStorage.getItem("access_token")) {
		sessionStorage.removeItem("access_token");
	}

	return {
		type: Actions.LOGOUT,
	};
};
