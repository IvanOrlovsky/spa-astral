import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCards } from "../store/actions/cards";
import Box from "@mui/material/Box";
import { CircularProgress, Typography } from "@mui/material";
import CardList from "../components/CardList";

export default function Cards() {
	const dispatch = useAppDispatch();

	const cards = useAppSelector((state) => state.cards.cards);

	useEffect(() => {
		dispatch(getCards());
	}, []);

	if (cards.length === 0) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					height: "100vh",
					backgroundColor: "white",
				}}
			>
				<CircularProgress size="3rem" />
				<Typography>Совсем скоро загрузятся карточки!!!</Typography>
			</Box>
		);
	}

	return (
		<Layout>
			<CardList cards={cards} />
		</Layout>
	);
}
