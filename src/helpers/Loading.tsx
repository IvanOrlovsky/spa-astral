import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingProps {
	text: string;
}

export default function Loading({ text }: LoadingProps) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "100vh",
				backgroundColor: "white",
			}}
		>
			<CircularProgress size="3rem" />
			<Typography>{text}</Typography>
		</Box>
	);
}
