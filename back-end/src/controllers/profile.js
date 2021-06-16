const bcrypt = require("bcrypt");
const db = require("../db/db");

const obterPerfil = async (req, res) => {
  const { usuario } = req;

  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { usuario } = req;

  if (!nome && !email && !senha && !nome_loja) {
    return res.status(400).json("Informe ao menos um campo.");
  }

  try {
    if (email) {
      const usuarios = await db.query(
        "select * from usuarios where email = $1 and id != $2",
        [email, usuario.id]
      );

      if (usuarios.rowCount > 0) {
        return res.status(404).json("O e-mail informado já existe.");
      }
    }
    const hash = senha ? await bcrypt.hash(senha, 10) : null;

    const perfil = await db.query(
      "update usuarios set nome = coalesce($1, nome), email = coalesce($2, email), senha = coalesce($3, senha), nome_loja = coalesce($4, nome_loja) where id = $5",
      [nome || null, email || null, hash, nome_loja || null, usuario.id]
    );

    if (perfil.rowCount === 0) {
      return res.status(400).json("Erro ao atualizar usuário.");
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  obterPerfil,
  atualizarPerfil,
};
