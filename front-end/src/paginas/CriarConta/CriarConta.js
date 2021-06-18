import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import useStyles from "./style";

import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Progresso from "../../components/Progresso/Progresso";

const CriarConta = () => {
  const classes = useStyles();

  const history = useHistory();

  const { register, handleSubmit } = useForm();

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

  const onSubmit = (data) => {
    setCarregando(true);
    fetch("http://localhost:5000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
          history.push("/");
        } else {
          setErro(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => setCarregando(false));
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <h1 className={classes.titulo}>Criar uma conta</h1>
        <form
          className={classes.form}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            required
            id="nome"
            label="Seu nome"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("nome", { required: true })}
          />
          <TextField
            required
            id="nomeLoja"
            label="Nome da loja"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("nomeLoja", { required: true })}
          />
          <TextField
            required
            id="email"
            label="Email"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("email", { required: true })}
          />
          <FormControl>
            <InputLabel htmlFor="senha" shrink={true}>
              Senha
            </InputLabel>
            <Input
              required
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
              {...register("senha", { require: true })}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="senha" shrink={true}>
              Repita a senha
            </InputLabel>
            <Input
              required
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
              {...register("senha", { require: true })}
            />
          </FormControl>
          <Button
            className={classes.botao}
            variant="contained"
            color="primary"
            type="submit"
          >
            CRIAR CONTA
          </Button>

          <Progresso open={carregando} />
        </form>

        <div className={classes.footer}>
          <p>
            Já possui conta? <Link to="/">ACESSE</Link>
          </p>
        </div>
      </div>
      <Dialog
        open={erro}
        onClose={erro}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Erro ao efetuar o cadastro.
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

export default CriarConta;
