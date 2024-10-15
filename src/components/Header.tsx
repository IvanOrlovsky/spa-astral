import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../store/actions/auth";
import { useNavigate } from "react-router-dom";
import { Actions } from "../store/actions/types";
import { deleteUser } from "../store/actions/user";

interface HeaderProps {
	logoText: string;
	username: string;
}

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	backdropFilter: "blur(24px)",
	border: "1px solid",
	borderColor: theme.palette.divider,
	backgroundColor: alpha(theme.palette.background.default, 0.4),
	boxShadow: theme.shadows[1],
	padding: "8px 12px",
}));

export default function Header({ logoText, username }: HeaderProps) {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	const handleLogout = () => {
		dispatch(deleteUser());
		dispatch(logout());
	};

	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<AppBar
			position="fixed"
			sx={{
				boxShadow: 0,
				bgcolor: "transparent",
				backgroundImage: "none",
			}}
		>
			<Container maxWidth="lg">
				<StyledToolbar variant="dense" disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							alignItems: "center",
							px: 0,
						}}
					>
						<Box
							sx={{
								display: { xs: "none", md: "flex", gap: 12 },
							}}
						>
							<Button
								component={NavLink}
								to="/"
								variant="contained"
								color="primary"
								size="medium"
							>
								{logoText}
							</Button>
							<Button
								component={NavLink}
								to="/cards"
								variant="text"
								color="info"
								size="small"
							>
								Карточки
							</Button>
							<Button
								component={NavLink}
								to="/profile"
								variant="text"
								color="info"
								size="small"
							>
								Ваш профиль, {username || "Незнакомец"}
							</Button>
						</Box>
					</Box>
					<Box
						sx={{
							display: { xs: "none", md: "flex" },
							gap: 1,
							alignItems: "center",
						}}
					>
						{isLoggedIn ? (
							<Button
								color="primary"
								variant="contained"
								size="small"
								onClick={handleLogout}
							>
								Выйти
							</Button>
						) : (
							<Button
								color="primary"
								variant="contained"
								size="small"
								onClick={handleLogin}
							>
								Войти в учетную запись
							</Button>
						)}
					</Box>
					<Box sx={{ display: { sm: "flex", md: "none" } }}>
						<IconButton
							aria-label="Menu button"
							onClick={toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<Drawer
							anchor="top"
							open={open}
							onClose={toggleDrawer(false)}
						>
							<Box
								sx={{
									p: 2,
									backgroundColor: "background.default",
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<IconButton onClick={toggleDrawer(false)}>
										<CloseRoundedIcon />
									</IconButton>
								</Box>
								<Divider sx={{ my: 3 }} />
								<MenuItem component={NavLink} to="/cards">
									Карточки
								</MenuItem>
								<MenuItem component={NavLink} to="/profile">
									Профиль
								</MenuItem>
								<MenuItem>
									{isLoggedIn ? (
										<Button
											color="primary"
											variant="contained"
											fullWidth
											onClick={handleLogout}
										>
											Выйти из учетной записи
										</Button>
									) : (
										<Button
											color="primary"
											variant="contained"
											fullWidth
											onClick={handleLogout}
										>
											Войти в учетную запись
										</Button>
									)}
								</MenuItem>
							</Box>
						</Drawer>
					</Box>
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}
