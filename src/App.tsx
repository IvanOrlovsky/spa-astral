import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Cards from "./pages/Cards";

const App = () => (
	<Routes>
		<Route path="/" element={<Home />} />
		<Route path="/login" element={<Login />} />
		<Route path="/profile" element={<Profile />} />
		<Route path="/cards" element={<Cards />} />
	</Routes>
);

export default App;
