const db = require("../db/db");

const listarProdutos = async (req, res) => {
  const { categoria } = req.query;
  const { usuario } = req;

  try {
    if (categoria) {
      const categoriaFormat = `${categoria}%`;

      const produtos = await db.query(
        "select * from produtos where usuario_id = $1 and categoria ilike $2",
        [usuario.id, categoriaFormat]
      );

      if (produtos.rowCount === 0) {
        return res
          .status(404)
          .json(
            "Não foram encontrados produtos desta categoria para o usuário."
          );
      }

      return res.status(200).json(produtos.rows);
    }

    const produtos = await db.query(
      "select * from produtos where usuario_id = $1",
      [usuario.id]
    );

    if (produtos.rowCount === 0) {
      return res
        .status(404)
        .json("Não foram encontrados produtos deste usuário.");
    }
    res.status(200).json(produtos.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { id } = req.params;
  const { usuario } = req;

  try {
    const produtos = await db.query("select * from produtos where id = $1", [
      id,
    ]);

    if (produtos.rowCount === 0) {
      return res.status(400).json("Produto não encontrado.");
    }

    const produto = produtos.rows[0];

    if (produto.usuario_id !== usuario.id) {
      return res.status(401).json("Produto não pertence ao usuário.");
    }

    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {};

module.exports = {
  listarProdutos,
  obterProduto,
};
