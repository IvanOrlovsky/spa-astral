import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";
import { useAppSelector } from "./hooks/hooks";
import ProtectedRoute from "./helpers/ProtectedRoute";

const App = () => {
	const accessToken = useAppSelector((state) => state.auth.accessToken);

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/"
				element={
					<ProtectedRoute accessToken={accessToken}>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/cards"
				element={
					<ProtectedRoute accessToken={accessToken}>
						<Cards />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute accessToken={accessToken}>
						<Profile />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default App;
