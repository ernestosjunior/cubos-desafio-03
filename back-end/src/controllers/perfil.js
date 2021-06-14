const bcrypt = require("bcrypt");
const db = require("../db/db");

const obterPerfil = async (req, res) => {
  const { usuario } = req;

  res.status(200).json(usuario);
};

const atualizarPerfil = async (req, res) => {
  const { nome, email, senha, nome_loja } = req.body;
  const { usuario } = req;

  try {
    if (email) {
      const usuarios = await db.query(
        "select * from usuarios where email = $1",
        [email]
      );

      if (usuarios.rowCount > 0) {
        return res
          .status(404)
          .json(
            "O e-mail informado já existe. Refaça a atualização com um email diferente."
          );
      }

      await db.query("update usuarios set email = $1  where id = $2", [
        email,
        usuario.id,
      ]);
    }

    if (nome) {
      await db.query("update usuarios set nome = $1 where id = $2", [
        nome,
        usuario.id,
      ]);
    }

    if (senha) {
      const hash = await bcrypt.hash(senha, 10);
      await db.query("update usuarios set senha = $1  where id = $2", [
        hash,
        usuario.id,
      ]);
    }

    if (nome_loja) {
      await db.query("update usuarios set nome_loja = $1  where id = $2", [
        nome_loja,
        usuario.id,
      ]);
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
