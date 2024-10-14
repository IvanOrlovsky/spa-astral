import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
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
	width: 275,
	height: 300,
	transformStyle: "preserve-3d",
	transition: "transform 0.8s",
}));

const CardSide = styled(Box)(() => ({
	position: "absolute",
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
}));

const CardFront = styled(CardSide)(() => ({
	backgroundColor: "white",
}));

const CardBack = styled(CardSide)(() => ({
	backgroundColor: "lightgray",
	transform: "rotateY(180deg)", // Вращаем заднюю сторону на 180 градусов
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
				perspective: "1000px", // Устанавливаем перспективу
			}}
		>
			<StyledCard
				sx={{
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", // Вращаем карточку в зависимости от состояния
				}}
			>
				{/* Передняя сторона */}
				<CardFront
					sx={{
						backfaceVisibility: isFlipped ? "hidden" : "visible",
					}}
				>
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
							Узнать перевод
						</Button>
					</CardActions>
				</CardFront>

				{/* Обратная сторона */}
				<CardBack
					sx={{
						backfaceVisibility: !isFlipped ? "hidden" : "visible",
					}}
				>
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
