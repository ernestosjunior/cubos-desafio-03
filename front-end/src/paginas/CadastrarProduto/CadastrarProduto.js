import useStyles from "./style";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { TokenContexto } from "../../App";
import Menu from "../../components/Menu/Menu";
import Progresso from "../../components/Progresso/Progresso";

const CadastrarProduto = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  const { usuario, token } = useContext(TokenContexto);

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

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
        if (response.ok) {
          history.push("/produtos");
        } else {
          setErro(true);
        }
      })
      .catch((error) => {
        setErro(true);
      })
      .finally(() => {
        setCarregando(false);
      });
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
                type="number"
                id="preco"
                label="Preço"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                {...register("preco", { required: true })}
              />
              <TextField
                type="number"
                id="estoque"
                label="Estoque"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">Un</InputAdornment>
                  ),
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
          <NavLink to="/produtos">CANCELAR</NavLink>
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
      <Dialog
        open={erro}
        onClose={erro}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Erro ao cadastrar produto.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErro(false)} color="primary">
            TENTAR NOVAMENTE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CadastrarProduto;
