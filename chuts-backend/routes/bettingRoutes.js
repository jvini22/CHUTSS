const express = require("express");
const { placeBet } = require("../controllers/bettingController");
const { authenticate } = require("../middleware/authenticate"); // Middleware de autenticação
const router = express.Router();

router.post("/place", authenticate, placeBet); // Protegendo a rota com autenticação

module.exports = router;
