import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  block: {
    position: "absolute",
    zIndex: 1,
    width: 420,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fab: {
    borderRadius: "unset",
    width: 200,
  },
  link: {
    textDecoration: "none",
    height: "100%",
  },
}));

export default function Routing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        <Link to="/" className={classes.link}>
          <Fab className={classes.fab}>Game</Fab>
        </Link>
        <Link to="/score" className={classes.link}>
          <Fab className={classes.fab}>Score</Fab>
        </Link>
      </div>
    </div>
  );
}
