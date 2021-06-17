import useStyles from "./style";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { TokenContexto } from "../../App";

import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";

const Home = () => {
  const classes = useStyles();
  const { token, usuario } = useContext(TokenContexto);
  const history = useHistory();
  const [produtos, setProdutos] = useState([]);
  function handleCadastrar() {
    history.push("/cadastrar-produto");
  }

  useEffect(() => {
    fetch("http://localhost:5000/produtos", {
      method: "GET",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, [token]);
  return (
    <div className={classes.home}>
      <Menu />
      <div className={classes.containerHome}>
        <div>
          <h1 className={classes.loja}>{usuario.nome_loja}</h1>
          <h2 className={classes.pagina}>Seus Produtos</h2>
        </div>
        <div className={classes.cards}>
          {produtos.map((p) => (
            <Card
              key={p.id}
              id={p.id}
              nome={p.nome}
              descricao={p.descricao}
              imagem={p.imagem}
              estoque={p.estoque}
              preco={p.preco}
            />
          ))}
        </div>
        <hr className={classes.hr} />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleCadastrar}
        >
          ADICIONAR PRODUTO
        </Button>
      </div>
    </div>
  );
};

export default Home;
