import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getRandomInt } from "../helpers/utils";

const MotivationalPhrases = {
	WORD_OF_THE_DAY: "Word of the Day",
	EXPAND_YOUR_VOCABULARY: "Expand Your Vocabulary",
	LEARN_SOMETHING_NEW: "Learn Something New",
	BOOST_YOUR_ENGLISH: "Boost Your English",
	MASTER_NEW_WORDS: "Master New Words",
	ELEVATE_YOUR_LANGUAGE: "Elevate Your Language",
	WORD_POWER: "Word Power",
	LINGUISTIC_CHALLENGE: "Linguistic Challenge",
	VOCABULARY_BUILDER: "Vocabulary Builder",
	LANGUAGE_EXPLORER: "Language Explorer",
};

interface WordCardProps {
	word: string;
	partOfSpeech: string;
	definition: string;
	example: string;
	translation: string;
}

const StyledCard = styled(Card)(() => ({
	position: "relative",
	transition: "transform 0.6s",
	transformStyle: "preserve-3d",
	width: 275,
	height: 300,
}));

const CardSide = styled(Box)(() => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	backfaceVisibility: "hidden",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
}));

const CardBack = styled(CardSide)(() => ({
	transform: "rotateY(180deg)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export default function WordCard({
	word,
	partOfSpeech,
	definition,
	example,
	translation,
}: WordCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const [motivationPhrase, setMotivationPhrase] = useState("");
	useEffect(() => {
		setMotivationPhrase(
			Object.values(MotivationalPhrases)[
				getRandomInt(0, Object.values(MotivationalPhrases).length - 1)
			]
		);
	}, []);

	return (
		<Box
			sx={{
				perspective: "1000px",
			}}
		>
			<StyledCard
				sx={{
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				<CardSide>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							{motivationPhrase}
						</Typography>
						<Typography variant="h5" component="div">
							{word}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{partOfSpeech}
						</Typography>
						<Typography variant="body2">
							{definition}
							<br />
							{example}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" onClick={handleFlip}>
							Learn More
						</Button>
					</CardActions>
				</CardSide>
				<CardBack>
					<CardContent>
						<Typography variant="h5" component="div" gutterBottom>
							Перевод
						</Typography>
						<Typography variant="body1">{translation}</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" onClick={handleFlip}>
							Вернуться
						</Button>
					</CardActions>
				</CardBack>
			</StyledCard>
		</Box>
	);
}
