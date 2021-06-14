const express = require("express");

const auth = require("./middlewares/auth"); //Middleware de autenticação

const cadastro = require("./controllers/cadastro");
const login = require("./controllers/login");
const perfil = require("./controllers/perfil");
const produtos = require("./controllers/produtos");

const router = express();

router.post("/cadastro", cadastro.cadastrarUsuario);
router.post("/login", login.login);

//rotas autenticadas

//perfil
router.get("/perfil", auth, perfil.obterPerfil);
router.put("/perfil", auth, perfil.atualizarPerfil);

//produtos
router.get("/produtos", auth, produtos.listarProdutos);
router.get("/produtos/:id", auth, produtos.obterProduto);

module.exports = router;
