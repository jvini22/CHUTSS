const express = require("express");
const { createMatch, getMatches } = require("../controllers/matchController");
const { authenticate } = require("../middleware/authenticate"); // Middleware de autenticação
const router = express.Router();

router.post("/create", authenticate, createMatch); // Protegendo a rota com autenticação
router.get("/", getMatches);

module.exports = router;
