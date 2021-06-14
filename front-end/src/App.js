import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import CriarConta from "./components/CriarConta/CriarConta";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/criarconta" component={CriarConta} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
