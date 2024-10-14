import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

import { login } from "../store/actions/auth";
import { useAppDispatch } from "../hooks/hooks";
import { NavLink } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignSelf: "center",
	width: "100%",
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: "auto",
	[theme.breakpoints.up("sm")]: {
		maxWidth: "450px",
	},
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	...theme.applyStyles("dark", {
		boxShadow:
			"hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
	}),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	minHeight: "100%",
	padding: theme.spacing(2),
	[theme.breakpoints.up("sm")]: {
		padding: theme.spacing(4),
	},
	"&::before": {
		content: '""',
		display: "block",
		position: "absolute",
		zIndex: -1,
		inset: 0,
		backgroundImage:
			"radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
		backgroundRepeat: "no-repeat",
		...theme.applyStyles("dark", {
			backgroundImage:
				"radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
		}),
	},
}));

export default function Login() {
	const dispatch = useAppDispatch();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		dispatch(
			login(
				data.get("login")?.toString() as string,
				data.get("password")?.toString() as string,
				data.get("remember")?.toString() as string
			)
		);
	};

	return (
		<>
			<CssBaseline enableColorScheme />
			<SignInContainer direction="column" justifyContent="space-between">
				<Card variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{
							width: "100%",
							fontSize: "clamp(2rem, 10vw, 2.15rem)",
						}}
					>
						Войдите в учетную запись
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="login">Логин</FormLabel>
							<TextField
								id="login"
								type="text"
								name="login"
								autoFocus
								required
								fullWidth
								variant="outlined"
								sx={{ ariaLabel: "login" }}
							/>
						</FormControl>
						<FormControl>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<FormLabel htmlFor="password">Пароль</FormLabel>
							</Box>
							<TextField
								name="password"
								placeholder="••••••"
								type="password"
								id="password"
								autoComplete="current-password"
								autoFocus
								required
								fullWidth
								variant="outlined"
							/>
						</FormControl>
						<FormControlLabel
							control={
								<Checkbox name="remember" color="primary" />
							}
							label="Запомнить меня"
						/>
						<Button type="submit" fullWidth variant="contained">
							Войти
						</Button>
						<Button
							type="button"
							component={NavLink}
							to="/"
							variant="outlined"
							color="primary"
							size="medium"
						>
							Вернуться на главную страницу
						</Button>
					</Box>
				</Card>
			</SignInContainer>
		</>
	);
}
