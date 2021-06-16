const segredoApi = require("../config/secret_api");
const db = require("../db/db");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Token não informado.");
  }
  try {
    const token = authorization.replace("Bearer", "").trim();

    const { id } = jwt.verify(token, segredoApi);
    const usuarios = await db.query("select * from usuarios where id = $1", [
      id,
    ]);

    if (usuarios.rowCount === 0) {
      return res.status(400).json("Usuário não encontrado.");
    }

    const { senha, ...usuario } = usuarios.rows[0];

    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = auth;
