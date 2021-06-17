import "./App.css";

import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RotasAutenticadas from "./components/RotasAutenticadas/RotasAutenticadas";
import Home from "./paginas/Home/Home";
import Login from "./paginas/Login/Login";
import CriarConta from "./paginas/CriarConta/CriarConta";
import AtualizarPerfil from "./paginas/AtualizarPerfil/AtualizarPerfil";
import CadastrarProduto from "./paginas/CadastrarProduto/CadastrarProduto";

import Perfil from "./components/Perfil/Perfil";

export const TokenContexto = createContext();

function App() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [usuario, setUsuario] = useState({});

  const valorContextoToken = {
    token,
    setToken,
    removeToken,
    usuario,
    setUsuario,
  };

  useEffect(() => {
    fetch("http://localhost:5000/perfil", {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsuario(data));
  }, [token]);

  return (
    <div>
      <Router>
        <Switch>
          <TokenContexto.Provider value={valorContextoToken}>
            <Route path="/login" component={Login} />
            <Route path="/cadastro" component={CriarConta} />
            <RotasAutenticadas token={token}>
              <Route path="/" exact component={Home} />
              <Route path="/perfil" component={Perfil} />
              <Route path="/atualizar-perfil" component={AtualizarPerfil} />
              <Route path="/cadastrar-produto" component={CadastrarProduto} />
            </RotasAutenticadas>
          </TokenContexto.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
