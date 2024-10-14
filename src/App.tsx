import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";

import ProtectedRoute from "./helpers/ProtectedRoute";
import { useAppSelector } from "./hooks/hooks";
import AlertMessage from "./components/AlertMessage";

const App = () => {
	const message = useAppSelector((state) => state.alert.message);
	const severity = useAppSelector((state) => state.alert.severity);

	return (
		<>
			<AlertMessage
				isOpen={!!message}
				message={message || ""}
				severity={severity || null}
			/>
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
		</>
	);
};

export default App;
