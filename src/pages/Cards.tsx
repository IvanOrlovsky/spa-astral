import Grid from "@mui/material/Grid2";

import Layout from "../components/Layout";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect } from "react";
import { getCards } from "../store/actions/cards";

import WordCard from "../components/WordCard";

export default function Cards() {
	const dispatch = useAppDispatch();

	const cards = useAppSelector((state) => state.cards.cards);

	useEffect(() => {
		dispatch(getCards());
	}, []);

	return (
		<Layout>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				{cards.map((card, index) => (
					<Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
						<WordCard {...card} />
					</Grid>
				))}
			</Grid>
		</Layout>
	);
}
