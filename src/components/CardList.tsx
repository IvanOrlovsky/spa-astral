import Grid from "@mui/material/Grid2";
import { WordCardType } from "../types/wordcard";
import WordCard from "./WordCard";

export default function CardList({ cards }: { cards: WordCardType[] }) {
	return (
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
	);
}
