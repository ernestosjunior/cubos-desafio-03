import Menu from "../../components/Menu/Menu";
import useStyles from "./style";
import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { TokenContexto } from "../../App";
import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from "react";

import Progresso from "../../components/Progresso/Progresso";

const CadastrarProduto = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const { usuario, token } = useContext(TokenContexto);

  const [carregando, setCarregando] = useState(false);

  const history = useHistory();

  function onSubmit(data) {
    setCarregando(true);
    fetch("http://localhost:5000/produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        nome: data.nomeProduto,
        estoque: data.estoque,
        preco: data.preco,
        categoria: data.categoria,
        descricao: data.descricao,
        imagem: data.imagem,
      }),
    })
      .then((response) => {
        setCarregando(false);
        history.push("/");
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div className={classes.container}>
      <Progresso open={carregando} />
      <Menu />
      <div className={classes.produtosContainer}>
        <h1 className={classes.loja}>{usuario.nome_loja}</h1>
        <h2 className={classes.pagina}>Adicionar produto</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.produtosInputs}>
            <TextField
              className={classes.inputs}
              id="nome-produto"
              label="Nome do produto"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("nomeProduto", { required: true })}
            />
            <div>
              <TextField
                className={classes.inputPequeno}
                id="preco"
                label="Preço"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("preco", { required: true })}
              />
              <TextField
                id="estoque"
                label="Estoque"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("estoque", { required: true })}
              />
            </div>
            <TextField
              className={classes.inputs}
              id="descricao"
              label="Descrição do produto"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("descricao", { required: true })}
            />
            <TextField
              className={classes.inputs}
              id="imagem"
              label="Imagem"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("imagem")}
            />
          </div>
          <hr className={classes.hr} />
          <NavLink to="/">CANCELAR</NavLink>
          <Button
            className={classes.botao}
            variant="contained"
            color="primary"
            type="submit"
          >
            ADICIONAR PRODUTO
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CadastrarProduto;
