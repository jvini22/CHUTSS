const { body, validationResult } = require("express-validator");
const pool = require("../db"); // Certifique-se de que o caminho está correto

exports.placeBet = [
  // Validação de entrada
  body("matchId").isInt().withMessage("ID da partida inválido"),
  body("xpAmount").isInt({ min: 1 }).withMessage("Quantidade de XP inválida"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { matchId, xpAmount } = req.body;
    const userId = req.user.id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const user = await client.query("SELECT xp FROM users WHERE id = $1", [userId]);
      if (user.rows[0].xp < xpAmount) {
        await client.query("ROLLBACK");
        return res.status(400).json({ message: "XP Insuficiente" });
      }

      await client.query("UPDATE users SET xp = xp - $1 WHERE id = $2", [
        xpAmount,
        userId,
      ]);
      await client.query(
        "INSERT INTO bets (user_id, match_id, xp_amount) VALUES ($1, $2, $3)",
        [userId, matchId, xpAmount],
      );

      await client.query("COMMIT");
      res.status(201).json({ message: "Aposta feita com sucesso!" });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error(error);
      res.status(500).json({ error: "Erro no servidor" });
    } finally {
      client.release();
    }
  }
];
