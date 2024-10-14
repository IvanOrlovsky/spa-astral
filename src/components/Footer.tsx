import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/X";
import { NavLink } from "react-router-dom";

function Copyright() {
	return (
		<Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
			{"Copyright © "}
			<Link color="text.secondary" href="https://mui.com/">
				Sitemark
			</Link>
			&nbsp;
			{new Date().getFullYear()}
		</Typography>
	);
}
interface Link {
	label: string;
	href: string;
}

interface FooterProps {
	newsletterTitle: string;
	newsletterDescription: string;
	footerLinks: Link[];
}

export default function Footer({
	newsletterTitle,
	newsletterDescription,
	footerLinks,
}: FooterProps) {
	return (
		<React.Fragment>
			<Divider />
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: { xs: 4, sm: 8 },
					py: { xs: 2, sm: 3 },
					textAlign: { sm: "center", md: "left" },
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 4,
							minWidth: { xs: "100%", sm: "60%" },
						}}
					>
						<Box sx={{ width: { xs: "100%", sm: "60%" } }}>
							<Typography
								variant="body2"
								gutterBottom
								sx={{ fontWeight: 600, mt: 2 }}
							>
								{newsletterTitle}
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "text.secondary", mb: 2 }}
							>
								{newsletterDescription}
							</Typography>
							<InputLabel htmlFor="email-newsletter">
								Ваша электронная почта
							</InputLabel>
							<Stack direction="row" spacing={1} useFlexGap>
								<TextField
									id="email-newsletter"
									hiddenLabel
									size="small"
									variant="outlined"
									fullWidth
									aria-label="Введите вашу электронную почту"
									placeholder="Электронная почта"
									slotProps={{
										htmlInput: {
											autoComplete: "off",
											"aria-label":
												"Введите вашу электронную почту",
										},
									}}
									sx={{ width: "250px" }}
								/>
								<Button
									variant="contained"
									color="primary"
									size="small"
									sx={{ flexShrink: 0 }}
								>
									Подписаться
								</Button>
							</Stack>
						</Box>
					</Box>

					<Box
						sx={{
							display: { xs: "none", sm: "flex" },
							flexDirection: "column",
							gap: 1,
						}}
					>
						{footerLinks?.map((link, index) => (
							<Link
								key={index}
								component={NavLink}
								to={link.href}
								color="text.secondary"
								variant="body2"
							>
								{link.label}
							</Link>
						))}
					</Box>
				</Box>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						pt: { xs: 4, sm: 8 },
						width: "100%",
						borderTop: "1px solid",
						borderColor: "divider",
					}}
				>
					<div>
						<Link color="text.secondary" variant="body2" href="#">
							Политика конфиденциальности
						</Link>
						<Typography
							sx={{ display: "inline", mx: 0.5, opacity: 0.5 }}
						>
							&nbsp;•&nbsp;
						</Typography>
						<Link color="text.secondary" variant="body2" href="#">
							Условия использования
						</Link>
						<Copyright />
					</div>
					<Stack
						direction="row"
						spacing={1}
						useFlexGap
						sx={{ justifyContent: "left", color: "text.secondary" }}
					>
						<IconButton
							color="inherit"
							size="small"
							href="https://github.com/mui"
							aria-label="GitHub"
							sx={{ alignSelf: "center" }}
						>
							<FacebookIcon />
						</IconButton>
						<IconButton
							color="inherit"
							size="small"
							href="https://x.com/MaterialUI"
							aria-label="X"
							sx={{ alignSelf: "center" }}
						>
							<TwitterIcon />
						</IconButton>
						<IconButton
							color="inherit"
							size="small"
							href="https://www.linkedin.com/company/mui/"
							aria-label="LinkedIn"
							sx={{ alignSelf: "center" }}
						>
							<LinkedInIcon />
						</IconButton>
					</Stack>
				</Box>
			</Container>
		</React.Fragment>
	);
}
