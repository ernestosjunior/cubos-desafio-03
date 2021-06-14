const bcrypt = require("bcrypt");
const db = require("../db/db");

const obterPerfil = async (req, res) => {
  const { usuario } = req;

  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { usuario } = req;

  if (!nome || !email || !senha || !nome_loja) {
    return res.status(400).json("Informe todos os campos.");
  }

  try {
    const usuarios = await db.query("select * from usuarios where email = $1", [
      email,
    ]);

    if (usuarios.rowCount > 0) {
      return res.status(404).json("O e-mail informado já existe.");
    }

    const hash = await bcrypt.hash(senha, 10);

    const usuarioUp = await db.query(
      "update usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 where id = $5",
      [nome, nome_loja, email, hash, usuario.id]
    );

    if (usuarioUp.rowCount === 0) {
      return res.status(400).json("Erro ao atualizar usuário.");
    }

    res.status(200).json("Usuário atualizado com sucesso.");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  obterPerfil,
  atualizarPerfil,
};
