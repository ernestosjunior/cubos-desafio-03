import useStyles from "./style";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";

const Cards = (props) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={classes.btnDelete}>
        <DeleteSweepIcon />
      </div>
      <CardActionArea>
        <CardMedia className={classes.imagem} image={props.imagem} title="" />
        <CardContent>
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
    </Card>
  );
};

export default Cards;
