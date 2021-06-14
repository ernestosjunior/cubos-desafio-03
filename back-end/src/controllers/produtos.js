const db = require("../db/db");

const listarProdutos = async (req, res) => {
  const { categoria } = req.query;
  const { usuario } = req;

  try {
    if (categoria) {
      const queryProdutos = await db.query(
        "select * from produtos where usuario_id = $1",
        [usuario.id]
      );

      if (queryProdutos.rowCount === 0) {
        return res
          .status(404)
          .json(
            "Não foram encontrados produtos desta categoria para o usuário."
          );
      }

      const produtos = queryProdutos.rows;

      const produtosFiltrados = produtos.filter(
        (p) => p.categoria === categoria
      );

      return res.status(200).json(produtosFiltrados);
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

const obterProduto = async (req, res) => {};

const cadastrarProduto = async (req, res) => {};

module.exports = {
  listarProdutos,
};
