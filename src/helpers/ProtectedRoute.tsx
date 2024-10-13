import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../hooks/hooks";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	return <>{isLoggedIn ? children : <Navigate to="/login" />}</>;
}
