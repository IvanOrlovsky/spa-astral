import React from "react";
import { Navigate } from "react-router";

export default function ProtectedRoute({
	children,
	accessToken,
}: {
	children: React.ReactNode;
	accessToken: string | null;
}) {
	return (
		<>
			{accessToken === process.env.REACT_APP_ACCESS_TOKEN ? (
				children
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
}
