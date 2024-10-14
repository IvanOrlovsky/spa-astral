import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCards } from "../store/actions/cards";
import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
import CardList from "../components/CardList";
import Loading from "../helpers/Loading";

export default function Cards() {
	const dispatch = useAppDispatch();

	const cards = useAppSelector((state) => state.cards.cards);

	useEffect(() => {
		dispatch(getCards());
	}, []);

	if (cards.length === 0) {
		return <Loading text="Совсем скоро загрузятся карточки!!!" />;
	}

	return (
		<Layout>
			<CardList cards={cards} />
		</Layout>
	);
}
