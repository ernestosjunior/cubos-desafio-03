import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  main: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    padding: "4px",
  },
  titulo: {
    fontSize: "34px",
    marginBottom: "80px",
    textAlign: "center",
  },
  botao: {
    margin: theme.spacing(1),
    width: "126px",
  },
  divBotao: {
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    gap: "12px",
  },
  container: {
    boxSizing: "border-box",
    maxWidth: "392px",
    padding: "68px",
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: "16px",
    backgroundColor: "white",
  },
  formFlex: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  login: {
    display: "grid",
    placeContent: "center",
    fontSize: "12px",
    marginTop: "24px",
  },
  progress: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
