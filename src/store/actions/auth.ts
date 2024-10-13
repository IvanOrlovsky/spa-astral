import { Dispatch } from "redux";
import { actionType } from "../../types/action";

import { Actions } from "./types";
import axios from "axios";

export const login =
	(login: string, password: string) =>
	async (dipatch: Dispatch<actionType>) => {
		if (
			login === process.env.REACT_APP_LOGIN &&
			password === process.env.REACT_APP_PASSWORD
		) {
			try {
				const response = await axios.post(
					process.env.REACT_APP_LOGIN_API as string
				);

				return dipatch({
					type: Actions.AUTH_SUCCESS,
					payload: response.data,
				});
			} catch (err) {
				return dipatch({
					type: Actions.AUTH_FAILURE,
				});
			}
		}
		return dipatch({
			type: Actions.AUTH_FAILURE,
		});
	};

export const logout = () => {};
