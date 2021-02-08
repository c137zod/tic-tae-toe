import {
  GAME_STATUS_REQUESTED,
  GAME_STATUS_SUCCEEDED,
  SCORE_FETCH_REQUESTED,
  SCORE_FETCH_SUCCEEDED,
  SCORE_RESET_REQUESTED,
  SCORE_RESET_SUCCEEDED,
  BOARD_FETCH_REQUESTED,
  BOARD_FETCH_SUCCEEDED,
  MOVE_BOARD_FETCH_REQUESTED,
  MOVE_BOARD_FETCH_SUCCEEDED,
  NEXT_GAME_REQUESTED,
  NEXT_GAME_SUCCEEDED,
  RESET_GAME_REQUESTED,
  RESET_GAME_SUCCEEDED,
} from "../actions";

const rootReducer = (
  state = {
    loading: false,
    status: false,
    player: "",
    game: {
      ai: "",
      board: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      end: true,
      nextMove: "",
      player: "",
      team: "",
      winner: "",
    },
    nextMove: "",
    end: false,
    team: "",
    score: {
      list: [],
    },
  },
  action
) => {
  switch (action.type) {
    case GAME_STATUS_REQUESTED:
      return { ...state, loading: true };
    case GAME_STATUS_SUCCEEDED:
      return { ...state, status: action.status, loading: false };
    case SCORE_FETCH_REQUESTED:
      return { ...state, loading: true };
    case SCORE_FETCH_SUCCEEDED:
      return { ...state, score: action.score, loading: false };
    case SCORE_RESET_REQUESTED:
      return { ...state, loading: true };
    case SCORE_RESET_SUCCEEDED:
      return { ...state, score: {
        list: [],
      }, loading: false };
    case BOARD_FETCH_REQUESTED:
      return { ...state, loading: true };
    case BOARD_FETCH_SUCCEEDED:
      return { ...state, game: action.game, loading: false };
    case MOVE_BOARD_FETCH_REQUESTED:
      return { ...state, loading: true };
    case MOVE_BOARD_FETCH_SUCCEEDED:
      return { ...state, game: action.game, loading: false };
    case NEXT_GAME_REQUESTED:
      return { ...state, loading: true };
    case NEXT_GAME_SUCCEEDED:
      return { ...state, game: action.game, loading: false };
    case RESET_GAME_REQUESTED:
      return { ...state, loading: true };
    case RESET_GAME_SUCCEEDED:
      return { ...state, game: action.game, loading: false };
    default:
      return state;
  }
};

export default rootReducer;
