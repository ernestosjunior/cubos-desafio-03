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

import { Link } from "react-router-dom";

const CriarConta = () => {
  const classes = useStyles();

  const { register, handleSubmit } = useForm();

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {};
  return (
    <>
      <div>
        <h1>Criar uma conta</h1>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Seu nome
          </InputLabel>
          <Input id="nome" {...register("nome", { required: true })} />
          <InputLabel htmlFor="standard-adornment-password">
            Nome da loja
          </InputLabel>
          <Input id="nome-loja" {...register("nomeLoja", { required: true })} />
          <InputLabel htmlFor="standard-adornment-password">E-mail</InputLabel>
          <Input id="email" {...register("email", { required: true })} />
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
          <Button
            className={classes.botao}
            variant="contained"
            color="primary"
            type="submit"
          >
            ENTRAR
          </Button>
        </form>
        <p>
          Já possui conta? <Link to="/login">ACESSE</Link>
        </p>
      </div>
    </>
  );
};

export default CriarConta;
