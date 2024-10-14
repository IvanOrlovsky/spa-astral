import { actionType } from "../../types/action";
import { Actions } from "../actions/types";
import { WordCard } from "../../types/wordcard";

export type cardsStateType = {
	cards: WordCard[];
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
