import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import LensOutlinedIcon from "@material-ui/icons/LensOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import {
  fetchGame,
  fetchGameMove,
  fetchNewGame,
  fetchResetGame,
} from "../../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "98vh",
    position: "relative",
  },
  block: {
    display: "block",
    margin: 0,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
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
  progress: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    margin: "auto,",
    width: 20,
    height: 20,
  },
  fabButton: {
    borderRadius: "unset",
    width: 200,
  },
  fabButtonPopoverContainerTrans: {
    height: 300,
    top: -350,
  },
  fabButtonPopoverContainer: {
    width: 200,
    display: "block",
    margin: "0 auto",
  },
  fabButtonPopoverTitle: {
    textAlign: "center",
    marginTop: 20,
    width: 400,
  },
  fabButtonPopover: {
    borderRadius: "unset",
    width: 200,
    margin: "20",
  },
  fab: {
    borderRadius: "unset",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Game(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    props.dispatch(fetchNewGame());
  };

  useEffect(() => {
    props.dispatch(fetchGame());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.dispatch(fetchGame());
    if (props.state.game.end === true) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.state.game.end]);

  const handleResetGame = () => {
    props.dispatch(fetchResetGame());
  };

  const handleClick = (item) => () => {
    if (item === "X" || item === "O") {
      return;
    } else {
      props.dispatch(fetchGameMove(item));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.block}>
        {props.state.loading === true ? (
          <CircularProgress className={classes.progress} />
        ) : (
          <></>
        )}
        {props.state.game.end === true ? (
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            className={classes.fabButtonPopoverContainerTrans}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle
              className={classes.fabButtonPopoverTitle}
              id="alert-dialog-slide-title"
            >
              {props.state.game.winner === "ai"
                ? "You lose"
                : props.state.game.winner === "player"
                ? "You win"
                : "Draw"}
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions className={classes.fabButtonPopoverContainer}>
            </DialogActions>
          </Dialog>
        ) : (
          <></>
        )}
        {props.state.game.board.map((item, index) => {
          return (
            <div className={classes.container} key={index}>
              {item.map((innerItem, innerIndex) => {
                return (
                  <Fab
                    disabled={
                      innerItem === "X"
                        ? true
                        : innerItem === "O"
                        ? true
                        : props.state.game.end === true
                        ? true
                        : false
                    }
                    className={classes.fab}
                    key={innerIndex}
                    onClick={handleClick(innerItem)}
                  >
                    {innerItem === "X" ? (
                      <CloseOutlinedIcon
                        fontSize="large"
                        style={{
                          fill:
                            props.state.game.player === "X"
                              ? "lightgreen"
                              : "red",
                        }}
                      />
                    ) : innerItem === "O" ? (
                      <LensOutlinedIcon
                        fontSize="large"
                        style={{
                          fill:
                            props.state.game.player === "X"
                              ? "red"
                              : "lightgreen",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </Fab>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={classes.controllerContainer}>
        <Fab className={classes.fabButton} onClick={handleResetGame}>
          Reset game
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

export default connect(mapStateToProps)(Game);
