import useStyles from "./style";

import { useContext, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import { TokenContexto } from "../../App";
import Menu from "../../components/Menu/Menu";
import Progresso from "../../components/Progresso/Progresso";

const EditarPerfil = () => {
  const { usuario, token, setUsuario } = useContext(TokenContexto);

  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState({
    showPassword: false,
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleAtualizarPerfil(data) {
    fetch("http://localhost:5000/perfil", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        nome: data.nome,
        nome_loja: data.nomeLoja,
        email: data.email,
        senha: data.senha,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            history.push("/perfil");
            setUsuario(data);
          });
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
      <Menu />
      <Progresso open={carregando} />
      <div className={classes.perfilContainer}>
        <h1 className={classes.loja}>{usuario.nome_loja}</h1>
        <h2 className={classes.pagina}>Editar Perfil</h2>
        <form onSubmit={handleSubmit(handleAtualizarPerfil)}>
          <div className={classes.perfilInputs}>
            <TextField
              className={classes.inputs}
              id="nome"
              label="Seu nome"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("nome")}
            />
            <TextField
              className={classes.inputs}
              id="nome-loja"
              label="Nome da loja"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("nomeLoja")}
            />
            <TextField
              className={classes.inputs}
              id="email"
              label="E-mail"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("email")}
            />
            <FormControl>
              <InputLabel htmlFor="senha" shrink={true}>
                Nova senha
              </InputLabel>
              <Input
                id="senha"
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("senha")}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="senha" shrink={true}>
                Repetir a nova senha
              </InputLabel>
              <Input
                id="repetirSenha"
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("repetirSenha")}
              />
            </FormControl>
          </div>
          <div className={classes.btnsForm}>
            <NavLink to="/perfil">CANCELAR</NavLink>
            <Button
              className={classes.botao}
              variant="contained"
              color="primary"
              type="submit"
            >
              EDITAR PERFIL
            </Button>
          </div>
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
            Erro ao atualizar seu perfil.
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

export default EditarPerfil;
