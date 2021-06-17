import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    padding: "60px",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "392px",
    height: "562px",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "16px",
    gap: "88px",
  },
  form: {
    display: "flex",
    gap: "40px",
    flexDirection: "column",
    padding: "0px 78px ",
  },
  footer: {
    fontSize: "12px",
  },
  progresso: {
    alignSelf: "center",
  },
  botao: {
    width: "87px",
    alignSelf: "center",
  },
}));
