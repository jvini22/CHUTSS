import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Importa o arquivo CSS global
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Renderiza o componente principal (App) dentro do elemento com id 'root'
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);

// Função para processar ou reportar as métricas de desempenho
const sendToAnalytics = (metric) => {
	console.log(metric);
	// Você pode enviar as métricas para um serviço de análise, como Google Analytics
};

// Inicia a coleta de métricas de desempenho
reportWebVitals(sendToAnalytics);

// Registro do service worker para melhorar o desempenho e a capacidade offline
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("/service-worker.js")
			.then((registration) => {
				console.log("Service Worker registrado com sucesso:", registration);
			})
			.catch((error) => {
				console.error("Falha ao registrar o Service Worker:", error);
			});
	});
}
