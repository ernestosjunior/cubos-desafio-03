const express = require("express");

const auth = require("./middlewares/auth"); //Middleware de autenticação

const register = require("./controllers/register");
const login = require("./controllers/login");
const profile = require("./controllers/profile");
const products = require("./controllers/products");

const router = express();

router.post("/cadastro", register.cadastrarUsuario);

router.post("/login", login.login);

router.get("/perfil", auth, profile.obterPerfil);

router.put("/perfil", auth, profile.atualizarPerfil);

router.get("/produtos", auth, products.listarProdutos);

router.get("/produtos/:id", auth, products.obterProduto);

router.post("/produtos", auth, products.cadastrarProduto);

router.put("/produtos/:id", auth, products.atualizarProduto);

router.delete("/produtos/:id", auth, products.excluirProduto);

module.exports = router;
