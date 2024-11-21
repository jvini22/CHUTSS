const pool = require("../db");

exports.createMatch = async (req, res) => {
  const { location, date } = req.body;
  try {
    await pool.query("INSERT INTO matches (location, date) VALUES ($1, $2)", [
      location,
      date,
    ]);
    res.status(201).json({ message: "Partida marcada com sucesso!" });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ message: "Erro no agendamento da partida :(" });
  }
};

exports.getMatches = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM matches ORDER BY date ASC");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Erro ao buscar partidas" });
  }
};
