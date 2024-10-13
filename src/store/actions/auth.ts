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

				console.log(remember);

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

				return dipatch({
					type: Actions.AUTH_SUCCESS,
					payload: true,
				});
			} catch (err) {
				return dipatch({
					type: Actions.AUTH_FAILURE,
				});
			}
		}
		return dipatch({
			type: Actions.INVALID_CREDENTIALS,
		});
	};

export const logout = () => {};
