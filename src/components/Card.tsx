import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

	const bull = (
		<Box
			component="span"
			sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
		>
			•
		</Box>
	);

	return (
		<Box
			sx={{
				perspective: "1000px",
				"&:hover": {
					"& > div": {
						transform: isFlipped
							? "rotateY(0deg)"
							: "rotateY(180deg)",
					},
				},
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
							Word of the Day
						</Typography>
						<Typography variant="h5" component="div">
							{word.split("").map((char, index) => (
								<React.Fragment key={index}>
									{char}
									{index !== word.length - 1 && bull}
								</React.Fragment>
							))}
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
