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

const cadastrarProduto = async (req, res) => {
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;

  if (!nome) {
    return res.status(400).json("Você deve informar o nome do produto.");
  }
  if (!estoque) {
    return res.status(400).json("Você deve informar o estoque do produto.");
  }
  if (!preco) {
    return res.status(400).json("Você deve informar o preco do produto.");
  }
  if (!descricao) {
    return res.status(400).json("Você deve informar a descrição do produto.");
  }

  try {
    const produto = await db.query(
      "insert into produtos (usuario_id,nome,estoque,categoria,preco,descricao,imagem) values ($1,$2,$3,$4,$5,$6,$7)",
      [
        usuario.id,
        nome,
        Number(estoque),
        categoria,
        Number(preco),
        descricao,
        imagem,
      ]
    );

    if (produto.rowCount === 0) {
      return res.status(400).json("Erro ao cadastrar produto.");
    }

    res.status(200).json("Produto cadastrado com sucesso.");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
  const { usuario } = req;

  if (!nome && !estoque && !categoria && !preco && descricao && !imagem) {
    return res.status(400).json("Informe ao menos um campo.");
  }

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

    const produtoAtualizacao = await db.query(
      "update produtos set nome = $1, estoque = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6  where id = $7",
      [
        nome || produto.nome,
        estoque || produto.estoque,
        categoria || produto.categoria,
        preco || produto.preco,
        descricao || produto.descricao,
        imagem || produto.imagem,
        id,
      ]
    );

    if (produtoAtualizacao.rowCount === 0) {
      return res.status(400).json("Erro ao atualizar o produto.");
    }

    res.status(200).json("A atualização foi realizada com sucesso.");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
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

    const produtoExclusao = await db.query(
      "delete from produtos where id = $1",
      [id]
    );

    if (produtoExclusao.rowCount === 0) {
      return res.status(400).json("Erro ao excluir o produto.");
    }

    res.status(200).json("A exclusão foi realizada com sucesso.");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
