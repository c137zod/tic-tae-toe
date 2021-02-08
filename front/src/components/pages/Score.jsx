import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { fetchScore, resetScore } from "../../actions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "98vh",
    position: "relative",
  },
  scoreContainer: {
    width: "100%",
    maxWidth: 360,
  },
  scoreContainerBottom: {
    maxWidth: 360,
    maxHeight: "70%",
    overflowY: "scroll"
  },
  controllerContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 200,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fabButton: {
    borderRadius: "unset",
    width: 200,
  },
}));

function Score(props) {
  const classes = useStyles();

  useEffect(() => {
    props.dispatch(fetchScore());
    console.log("props", props);
    console.log("props.state.score.list",props.state.score.list)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    props.dispatch(resetScore());
    console.log("props", props);
  };

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        <ListItem>
          <ListItemText
            primary="User"
            secondary={`${props.state.score.player ? props.state.score.player : 0} wins`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemText
            primary="Computer"
            secondary={`${props.state.score.ai ? props.state.score.ai : 0} wins`}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <List className={classes.scoreContainerBottom}>
      {props.state.score.list.length > 0 ?
      props.state.score.list.map((item, index) => {
        return (
          <ListItem key={index}>
            <ListItemText
              primary={`${item.winner === "player" ? "User" : item.winner === "ai" ? "Computer" : "No one"} wins`}
              secondary={`${item.team ? "team" : ""} ${item.team ? item.team : ""}`}
            />
            <Divider variant="inset" component="li" />
          </ListItem>
        )})
        :
        <></>
        }
      </List>
      <div className={classes.controllerContainer}>
        <Fab className={classes.fabButton} onClick={handleReset}>
          Reset score
        </Fab>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}

export default connect(mapStateToProps)(Score);
