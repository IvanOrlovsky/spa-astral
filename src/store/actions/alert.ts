import { actionType } from "../../types/action";
import { Actions } from "./types";

export const closeAlert = (): actionType => {
	return {
		type: Actions.CLOSE_ALERT,
	};
};
