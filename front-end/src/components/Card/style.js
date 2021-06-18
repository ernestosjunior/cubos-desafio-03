import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  card: {
    width: 201,
    minWidth: 201,
    maxHeight: 355,
    marginBottom: "8px",
    position: "relative",
    borderRadius: "24px !important",
  },
  btnDelete: {
    position: "absolute",
    zIndex: 1,
    top: "22px",
    left: "22px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#FF505F",
    display: "grid",
    placeItems: "center",
  },
  imagem: {
    width: 201,
    height: 220,
    backgroundSize: "cover",
  },
  nome: {
    fontSize: "20px",
    letterSpacing: "0.15px",
    color: "#575757",
    fontWeight: 500,
  },
  descricao: {
    fontSize: "12px",
    letterSpacing: "0.4px",
    color: "rgba(34, 34, 34, 0.87)",
  },
  estoque: {
    fontSize: "12px",
    color: " rgba(101, 101, 101, 0.87)",
    letterSpacing: "1px",
  },
  preco: {
    fontSize: "13px",
    letterSpacing: " 0.073125px",
    color: "rgba(0, 0, 0, 0.87)",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "17px !important",
  },
  dialogContent: {
    fontSize: "24px",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: "40px",
  },
}));
