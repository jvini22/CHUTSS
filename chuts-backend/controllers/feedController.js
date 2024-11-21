const pool = require("../db");

exports.createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  try {
    await pool.query("INSERT INTO posts (user_id, content) VALUES ($1, $2)", [
      userId,
      content,
    ]);
    res.status(201).json({ message: "Post criado com sucesso!" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Erro ao criar post" });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    if (result.rows.length > 0) {
      res.json(result.rows); // Retorna os posts encontrados
    } else {
      res.status(404).json({ message: "Nenhum post encontrado" }); // Nenhum post encontrado
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Erro ao buscar posts" }); // Erro ao buscar dados
  }
};
