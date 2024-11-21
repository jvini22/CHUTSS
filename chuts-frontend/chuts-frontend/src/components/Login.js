/**
 * Componente de Login
 *
 * Este componente renderiza um formulário de login e lida com a autenticação do usuário.
 *
 * @component
 */

import React, { useState } from "react";
import axios from "axios";
import { FormWrapper } from "../../../src/styles/FormWrapper";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const response = await axios.post(
				"http://localhost:5000/api/auth/login",
				{ email, password },
			);
			localStorage.setItem("token", response.data.token);
			alert("Login feito com sucesso!");
		} catch (error) {
			setError("Credenciais Inválidas!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<FormWrapper>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<button type="submit" onClick={handleSubmit} disabled={loading}>
				{loading ? "Carregando..." : "Login"}
			</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</FormWrapper>
	);
}

export default Login;
