import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useAppDispatch } from "../hooks/hooks";
import { closeAlert } from "../store/actions/alert";

export default function AlertMessage({
	isOpen,
	severity,
	message,
}: {
	isOpen: boolean;
	severity?: "error" | "warning" | "info" | "success" | null | undefined;
	message: string;
}) {
	if (!severity) {
		severity = "error";
	}

	const dispatch = useAppDispatch();

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		dispatch(closeAlert());
	};

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert
				severity={severity}
				sx={{ width: "100%" }}
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={handleClose}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
			>
				{message}
			</Alert>
		</Snackbar>
	);
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
