import { actionType } from "../../types/action";
import { Actions } from "../actions/types";
import { WordCardType } from "../../types/wordcard";

export type cardsStateType = {
	cards: WordCardType[];
};

const defaultState: cardsStateType = {
	cards: [],
};

export function cardsReducer(
	state = defaultState,
	action: actionType
): cardsStateType {
	switch (action.type) {
		case Actions.GET_CARDS:
			return {
				...state,
				cards: [...state.cards, ...action.payload],
			};

		default:
			return state;
	}
}
