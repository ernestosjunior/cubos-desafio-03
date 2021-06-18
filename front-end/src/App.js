import "./App.css";

import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RotasAutenticadas from "./components/RotasAutenticadas/RotasAutenticadas";
import Home from "./paginas/Produtos/Produtos";
import Login from "./paginas/Login/Login";
import CriarConta from "./paginas/CriarConta/CriarConta";
import AtualizarPerfil from "./paginas/EditarPerfil/EditarPerfil";
import CadastrarProduto from "./paginas/CadastrarProduto/CadastrarProduto";
import Perfil from "./paginas/Perfil/Perfil";
import AtualizarProduto from "./paginas/EditarProduto/EditarProduto";

export const TokenContexto = createContext();

function App() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [usuarioStorage, setUsuarioStorage, removeUsuarioStorage] =
    useLocalStorage("usuario", {});
  const [usuario, setUsuario] = useState({});
  const [produtos, setProdutos] = useState([]);

  const valorContextoToken = {
    token,
    setToken,
    removeToken,
    usuario,
    setUsuario,
    produtos,
    setProdutos,
    removeUsuarioStorage,
  };

  useEffect(() => {
    if (usuarioStorage.id) {
      setUsuario(usuarioStorage);
    }
  }, []);

  useEffect(() => {
    if (usuario.id) {
      setUsuarioStorage(usuario);
    }
  }, [usuario]);

  return (
    <div>
      <Router>
        <Switch>
          <TokenContexto.Provider value={valorContextoToken}>
            <Route path="/" exact component={Login} />
            <Route path="/cadastro" component={CriarConta} />
            <RotasAutenticadas token={token}>
              <Route path="/produtos" component={Home} />
              <Route path="/perfil" component={Perfil} />
              <Route path="/perfil-editar" component={AtualizarPerfil} />
              <Route path="/produtos-novo" component={CadastrarProduto} />
              <Route path="/produtos-editar/:id" component={AtualizarProduto} />
            </RotasAutenticadas>
          </TokenContexto.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
