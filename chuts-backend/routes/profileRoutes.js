const express = require("express");
const { getProfile } = require("../controllers/profileController");
const { authenticate } = require("../middleware/authenticate"); // Middleware de autenticação
const router = express.Router();

router.get("/", authenticate, getProfile); // Protegendo a rota com autenticação

module.exports = router;
