const db = require("../db/db");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
  const { nome, nome_loja, email, senha } = req.body;

  if (!nome || !nome_loja || !email || !senha) {
    return res.status(400).json("Todos os campos são obrigatórios.");
  }

  try {
    const usuarios = await db.query("select * from usuarios where email = $1", [
      email,
    ]);

    if (usuarios.rowCount > 0) {
      return res.status(404).json("O e-mail informado já existe.");
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuario = await db.query(
      "insert into usuarios (nome, nome_loja, email, senha) values ($1,$2,$3,$4)",
      [nome, nome_loja, email, hash]
    );

    if (usuario.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário.");
    }

    res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  cadastrarUsuario,
};
