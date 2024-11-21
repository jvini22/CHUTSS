const express = require("express");
const { createPost, getPosts } = require("../controllers/feedController");
const { authenticate } = require("../middleware/authenticate"); // Middleware de autenticação
const router = express.Router();

router.post("/create", authenticate, createPost); // Protegendo a rota com autenticação
router.get("/", getPosts);

module.exports = router;
