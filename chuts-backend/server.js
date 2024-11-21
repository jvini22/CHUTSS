const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const authRoutes = require("./routes/authRoutes");
const matchRoutes = require("./routes/matchRoutes");
const feedRoutes = require("./routes/feedRoutes");
const bettingRoutes = require("./routes/bettingRoutes");
const profileRoutes = require("./routes/profileRoutes");
const pool = require("./db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de segurança
app.use(cors());
app.use(helmet());
app.use(xss());

// Middleware de logs
app.use(morgan("combined"));

// Limitar requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
});
app.use(limiter);

app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/betting", bettingRoutes);
app.use("/api/profile", profileRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Algo deu errado!",
  });
});

// Iniciar o servidor
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Encerrar o servidor corretamente
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    pool.end(() => {
      console.log("Database pool closed");
    });
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    pool.end(() => {
      console.log("Database pool closed");
    });
  });
});
