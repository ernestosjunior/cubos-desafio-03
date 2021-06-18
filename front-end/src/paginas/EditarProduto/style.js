import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  produtosContainer: {
    marginLeft: "74px",
    width: "100%",
    marginRight: "109px",
  },
  produtosInputs: {
    marginTop: "57px",
    marginBottom: "45px",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  inputs: {
    width: "445px",
  },
  inputPequeno: {
    maxWidth: "400px !important",
    marginRight: "24px",
  },
  hr: {
    marginBottom: "25px",
  },
  botao: {
    marginLeft: "24px",
  },
  loja: {
    marginTop: "24px",
  },
  pagina: {
    marginTop: "37px",
  },
}));
