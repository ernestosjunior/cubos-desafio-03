import useStyles from "./style";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import Button from "@material-ui/core/Button";

import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { TokenContexto } from "../../App";
import Progresso from "../../components/Progresso/Progresso";

const Cards = (props) => {
  const { token, produtos, setProdutos } = useContext(TokenContexto);

  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState(false);

  function handleAbirDialog() {
    setOpen(true);
  }

  function handleEditarProd(id) {
    history.push(`/produtos-editar/${id}`);
  }

  function handleRemover(id) {
    fetch(`http://localhost:5000/produtos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          const novosProdutos = produtos.filter((p) => p.id !== id);
          setProdutos(novosProdutos);
        } else {
          setErro(true);
        }
      })
      .catch((error) => {
        setErro(true);
      })
      .finally(() => {
        setOpen(false);
      });
  }
  return (
    <Card className={classes.card}>
      <Progresso open={open} />
      <div className={classes.btnDelete} onClick={() => handleAbirDialog()}>
        <DeleteSweepIcon />
      </div>
      <CardActionArea onClick={() => handleEditarProd(props.id)}>
        <CardMedia className={classes.imagem} image={props.imagem} title="" />
        <CardContent onClick={() => handleEditarProd(props.id)}>
          <Typography
            className={classes.nome}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.nome}
          </Typography>
          <Typography
            className={classes.descricao}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {props.descricao}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.footer}>
        <p className={classes.estoque}>{props.estoque} unidades</p>
        <p className={classes.preco}>R$ {(props.preco / 100).toFixed(2)}</p>
      </CardActions>
      <Dialog
        open={open}
        onClose={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            <div className={classes.dialogContent}>
              Remover produto do catálogo?
            </div>
            Esta ação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="primary"
            variant="contained"
          >
            MANTER PRODUTO
          </Button>
          <Button
            onClick={() => {
              handleRemover(props.id);
            }}
            color="secondary"
            variant="contained"
          >
            REMOVER
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={erro}
        onClose={erro}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>Erro ao remover produto.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setErro(false)} color="primary">
            TENTAR NOVAMENTE
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Cards;
