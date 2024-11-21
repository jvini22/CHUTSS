const pool = require("../db");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Perfil não encontrado" });
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Erro ao buscar perfil" });
  }
};
