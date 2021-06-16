import "./App.css";

import { createContext } from "react";
import { useLocalStorage } from "react-use";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RotasAutenticadas from "./components/RotasAutenticadas/RotasAutenticadas";
import Login from "./components/Login/Login";
import CriarConta from "./components/CriarConta/CriarConta";
import Home from "./components/Home/Home";
import Perfil from "./components/Perfil/Perfil";

export const TokenContexto = createContext();

function App() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");

  const valorContextoToken = { token, setToken, removeToken };

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
            </RotasAutenticadas>
          </TokenContexto.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
