import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  }
}));

const LoadingComponent = () => {
  const classes = useStyles();

  return (
    <div>
      <CircularProgress className={classes.progress} />
      {/* <CardMedia
        component="img"
        image="https://media.giphy.com/media/7TcdqHUCFIfEaRJzKn/giphy.gif"
        title="Joker"
      /> */}
    </div>
  );
};

export default LoadingComponent;
