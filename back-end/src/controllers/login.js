const segredoApi = require("../config/secret_api");
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("Todos os campos são obrigatórios.");
  }

  try {
    const usuarios = await db.query("select * from usuarios where email = $1", [
      email,
    ]);

    if (usuarios.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado.");
    }

    const usuario = usuarios.rows[0];

    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(401).json("E-mail ou senha não conferem.");
    }

    const token = jwt.sign({ id: usuario.id }, segredoApi, {
      expiresIn: "1d",
    });

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    res.status(200).json({ usuario: dadosUsuario, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
