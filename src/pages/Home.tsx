import React from "react";
import {
	Typography,
	Button,
	Box,
	Card,
	CardContent,
	Stack,
} from "@mui/material";
import {
	School as SchoolIcon,
	Timeline as TimelineIcon,
	EmojiEvents as EmojiEventsIcon,
} from "@mui/icons-material";
import Layout from "../components/Layout";

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	icon,
	title,
	description,
}) => (
	<Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
		<CardContent sx={{ flexGrow: 1 }}>
			{icon}
			<Typography gutterBottom variant="h5" component="h2">
				{title}
			</Typography>
			<Typography>{description}</Typography>
		</CardContent>
	</Card>
);

const HomePage: React.FC = () => {
	return (
		<Layout>
			<Box sx={{ my: 4 }}>
				<Typography variant="h3" component="h1" gutterBottom>
					Добро пожаловать в WordMaster
				</Typography>
				<Typography variant="h5" sx={{ mb: 4 }}>
					Ваш путь к свободному владению английским языком начинается
					здесь!
				</Typography>
				<Button
					variant="contained"
					color="primary"
					size="large"
					sx={{ mb: 4 }}
				>
					Начать обучение
				</Button>

				<Stack direction={{ xs: "column", md: "row" }} spacing={4}>
					<FeatureCard
						icon={
							<SchoolIcon
								sx={{
									fontSize: 40,
									color: "primary.main",
									mb: 2,
								}}
							/>
						}
						title="Интерактивные уроки"
						description="Погрузитесь в мир английского языка с нашими увлекательными интерактивными уроками."
					/>
					<FeatureCard
						icon={
							<TimelineIcon
								sx={{
									fontSize: 40,
									color: "secondary.main",
									mb: 2,
								}}
							/>
						}
						title="Адаптивное обучение"
						description="Наша система подстраивается под ваш уровень и темп, обеспечивая эффективное изучение новых слов."
					/>
					<FeatureCard
						icon={
							<EmojiEventsIcon
								sx={{
									fontSize: 40,
									color: "success.main",
									mb: 2,
								}}
							/>
						}
						title="Игровые элементы"
						description="Соревнуйтесь с друзьями, зарабатывайте очки и открывайте достижения в процессе обучения."
					/>
				</Stack>

				<Box sx={{ mt: 6, textAlign: "center" }}>
					<Typography variant="h4" gutterBottom>
						Почему WordMaster?
					</Typography>
					<Typography variant="body1">
						WordMaster - это инновационная платформа для изучения
						английских слов, которая сочетает в себе эффективные
						методики обучения с увлекательным игровым процессом.
						Наша цель - сделать изучение языка доступным, интересным
						и результативным для каждого.
					</Typography>
				</Box>
			</Box>
		</Layout>
	);
};

export default HomePage;
