import * as React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "./Header";
import Footer from "./Footer";

const Root = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	minHeight: "100vh",
}));

const Main = styled("main")(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	paddingTop: theme.spacing(10),
}));

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<Root>
			<Header />
			<Main>
				<Container maxWidth="lg">
					<Box sx={{ my: 4 }}>{children}</Box>
				</Container>
			</Main>
			<Footer
				newsletterTitle="Подпишитесь на нашу рассылку новостей из мира изучения анлийского языка!"
				newsletterDescription="Так, вы всегда будете знать самую актуальную информацию"
				footerLinks={[
					{ href: "/cards", label: "Карточки" },
					{ href: "/profile", label: "Профиль" },
				]}
			/>
		</Root>
	);
}
