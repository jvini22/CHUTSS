const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // Certifique-se de que o caminho está correto
const { body, validationResult } = require("express-validator");

exports.register = [
  // Validação de entrada
  body("email").isEmail().withMessage("Email inválido"),
  body("password").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        hashedPassword,
      ]);
      res.status(201).json({ message: "Usuário Registrado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  }
];

exports.login = [
  // Validação de entrada
  body("email").isEmail().withMessage("Email inválido"),
  body("password").notEmpty().withMessage("Senha é obrigatória"),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (
        user.rows.length > 0 &&
        (await bcrypt.compare(password, user.rows[0].password))
      ) {
        const token = jwt.sign(
          { userId: user.rows[0].id },
          process.env.JWT_SECRET,
          { expiresIn: "1h" } // Token expira em 1 hora
        );
        res.json({ token });
      } else {
        res.status(401).json({ error: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  }
];
