import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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

/*
Наверное стоит прояснить
Тут я использовал, так сказать, синергию div и MUI-компонентов, потому 
что если строить карточку через Box и styled components, то внутренние
стили MUI препятствуют нормально отображению анимации, в частности, 
как бы я не старался, видна только одна часть карточки(задняя или передняя)
Поэтому вот так вот.
*/
export default function WordCard({
	word,
	partOfSpeech,
	definition,
	example,
	translation,
}: WordCardProps) {
	const [isFlipped, setIsFlipped] = useState(false);
	const [motivationPhrase, setMotivationPhrase] = useState("");

	useEffect(() => {
		setMotivationPhrase(
			Object.values(MotivationalPhrases)[
				getRandomInt(0, Object.values(MotivationalPhrases).length - 1)
			]
		);
	}, []);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div
			style={{
				position: "relative",
				width: "275px",
				height: "300px",
				perspective: "1000px",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "100%",
					transformStyle: "preserve-3d",
					transition: "transform 0.8s ease",
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
					position: "relative",
					borderRadius: "16px",
					boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
					padding: 4,
				}}
			>
				{/* Лицевая сторона */}
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						backgroundColor: "white",
						transform: "rotateY(0deg)",
						borderRadius: "16px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<div style={{ padding: "16px" }}>
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
					</div>
					<div style={{ padding: "16px", textAlign: "center" }}>
						<Button
							variant="contained"
							onClick={handleFlip}
							sx={{ width: "100%", backgroundColor: "#1976d2" }}
						>
							Узнать перевод
						</Button>
					</div>
				</div>

				{/* Обратная сторона */}
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						backgroundColor: "#f5f5f5",
						transform: "rotateY(180deg)",
						borderRadius: "16px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<div style={{ padding: "16px" }}>
						<Typography variant="h5" component="div">
							Перевод
						</Typography>
						<Typography variant="body1">{translation}</Typography>
					</div>
					<div style={{ padding: "16px", textAlign: "center" }}>
						<Button
							variant="contained"
							onClick={handleFlip}
							sx={{ width: "100%", backgroundColor: "#1976d2" }}
						>
							Вернуться
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
