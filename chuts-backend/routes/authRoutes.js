const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register); // Registrar um novo usuário
router.post("/login", login); // Fazer login com um usuário existente

module.exports = router;
