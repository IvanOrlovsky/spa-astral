import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";

import ProtectedRoute from "./helpers/ProtectedRoute";
import { useAppSelector } from "./hooks/hooks";

const App = () => {
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

	
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/cards"
				element={
					<ProtectedRoute>
						<Cards />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
};

export default App;
