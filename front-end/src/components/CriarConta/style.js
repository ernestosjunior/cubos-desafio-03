import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  botao: {
    margin: theme.spacing(1),
    width: "126px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));
