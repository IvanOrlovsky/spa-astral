import React from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
	children: React.ReactNode;
	redirectTo: string;
	isProtected: boolean;
}
export default function ProtectedRoute({
	children,
	redirectTo,
	isProtected,
}: ProtectedRouteProps) {
	return <>{isProtected ? children : <Navigate to={redirectTo} />}</>;
}
