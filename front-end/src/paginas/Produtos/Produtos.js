import "./produtos.css";
import useStyles from "./style";

import { useEffect, useState, useContext } from "react";
import { TokenContexto } from "../../App";

import { useHistory } from "react-router";

import Button from "@material-ui/core/Button";

import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";

const Produtos = () => {
  const classes = useStyles();
  const { token, usuario, produtos, setProdutos } = useContext(TokenContexto);
  const history = useHistory();

  function handleCadastrar() {
    history.push("/produtos-novo");
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
          {produtos.map((p) => {
            return (
              <Card
                key={p.id}
                id={p.id}
                nome={p.nome}
                descricao={p.descricao}
                imagem={p.imagem}
                estoque={p.estoque}
                preco={p.preco}
              />
            );
          })}
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

export default Produtos;
