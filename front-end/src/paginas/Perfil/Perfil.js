import { useContext } from "react";
import { useHistory } from "react-router-dom";

import useStyles from "./style";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { TokenContexto } from "../../App";
import Menu from "../../components/Menu/Menu";

const Perfil = () => {
  const { usuario } = useContext(TokenContexto);

  const classes = useStyles();
  const history = useHistory();

  function handleAtualizarPerfil() {
    history.push("/perfil-editar");
  }

  return (
    <div className={classes.perfil}>
      <Menu />
      <div className={classes.perfilContainer}>
        <h1 className={classes.loja}>{usuario.nome_loja}</h1>
        <h2 className={classes.pagina}>Perfil</h2>
        <div className={classes.perfilInputs}>
          <TextField
            className={classes.inputs}
            id="nome"
            label="Seu nome"
            value={usuario.nome}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.inputs}
            id="nome-loja"
            label="Nome da loja"
            value={usuario.nome_loja}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.inputs}
            id="email"
            label="E-mail"
            value={usuario.email}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <hr />
        <Button
          className={classes.botao}
          variant="contained"
          color="primary"
          onClick={handleAtualizarPerfil}
          type="submit"
        >
          EDITAR PERFIL
        </Button>
      </div>
    </div>
  );
};

export default Perfil;
