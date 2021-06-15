import { useState } from "react";
import useStyles from "./style";
import { useForm } from "react-hook-form";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link, useHistory } from "react-router-dom";

const CriarConta = () => {
  const classes = useStyles();

  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const [carregando, setCarregando] = useState(false);

  const [values, setValues] = useState({
    showPassword: false,
  });

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
    }).then(() => {
      setCarregando(false);
      history.push("/login");
    });
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h1 className={classes.titulo}>Criar uma conta</h1>
        <form
          className={(classes.root, classes.formFlex)}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Seu nome
          </InputLabel>
          <Input required id="nome" {...register("nome", { required: true })} />
          <InputLabel htmlFor="standard-adornment-password">
            Nome da loja
          </InputLabel>
          <Input
            required
            id="nome-loja"
            {...register("nomeLoja", { required: true })}
          />
          <InputLabel htmlFor="standard-adornment-password">E-mail</InputLabel>
          <Input
            required
            id="email"
            {...register("email", { required: true })}
          />
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
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
            {...register("senha", { required: true })}
          />
          <InputLabel htmlFor="standard-adornment-password">
            {" "}
            Repita a senha
          </InputLabel>
          <Input
            required
            id="repetir-senha"
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
            {...register("repetirSenha", { required: true })}
          />
          <div className={classes.divBotao}>
            {carregando ? <CircularProgress /> : ""}
            <Button
              className={classes.botao}
              variant="contained"
              color="primary"
              type="submit"
            >
              CRIAR CONTA
            </Button>
          </div>
        </form>
        <div className={classes.login}>
          <p>
            Já possui conta? <Link to="/login">ACESSE</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CriarConta;
