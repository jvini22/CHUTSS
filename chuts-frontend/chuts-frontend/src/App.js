import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import ScheduleMatch from "./components/ScheduleMatch";
import Feed from "./components/Feed";
import Bet from "./components/Bet";
import Profile from "./components/Profile";
import Navbar from "./components/NavBar";
import "./App.css"; // Importa o arquivo CSS global
import PropTypes from "prop-types";

// Componente para proteger rotas
const PrivateRoute = ({ element: Component, ...rest }) => {
	const isAuthenticated = !!localStorage.getItem("token");
	return isAuthenticated ? <Component {...rest} /> : <Navigate to="/" />;
};

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/schedule"
						element={<PrivateRoute element={ScheduleMatch} />}
					/>
					<Route path="/feed" element={<PrivateRoute element={Feed} />} />
					<Route path="/bet" element={<PrivateRoute element={Bet} />} />
					<Route path="/profile" element={<PrivateRoute element={Profile} />} />
				</Routes>
			</div>
		</Router>
	);
}
PrivateRoute.propTypes = {
	element: PropTypes.elementType.isRequired,
};

export default App;
