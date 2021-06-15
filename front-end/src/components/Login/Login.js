import { useState } from "react";
import useStyles from "./style";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";

import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";

import { TokenContexto } from "../../App";

const Login = () => {
  const { setToken } = useContext(TokenContexto);
  const classes = useStyles();

  const history = useHistory();

  const { register, handleSubmit } = useForm();

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
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, senha: data.senha }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        history.push("/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <h1 className={classes.titulo}>Login</h1>
        <form
          className={(classes.root, classes.formFlex)}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <div className={classes.divBotao}>
            <Button
              className={classes.botao}
              variant="contained"
              color="primary"
              type="submit"
            >
              ENTRAR
            </Button>
          </div>
        </form>
        <div className={classes.criarConta}>
          <p>
            Primeira vez aqui? <Link to="/cadastro">CRIE UMA CONTA</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
