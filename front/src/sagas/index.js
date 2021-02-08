import { takeLatest, put, call, fork, all } from "redux-saga/effects";
import { api } from "../services";
import {
  GAME_STATUS_REQUESTED,
  GAME_STATUS_SUCCEEDED,
  GAME_STATUS_FAILED,
  SCORE_FETCH_REQUESTED,
  SCORE_FETCH_SUCCEEDED,
  SCORE_FETCH_FAILED,
  SCORE_RESET_REQUESTED,
  SCORE_RESET_SUCCEEDED,
  SCORE_RESET_FAILED,
  BOARD_FETCH_REQUESTED,
  BOARD_FETCH_SUCCEEDED,
  BOARD_FETCH_FAILED,
  MOVE_BOARD_FETCH_REQUESTED,
  MOVE_BOARD_FETCH_SUCCEEDED,
  MOVE_BOARD_FETCH_FAILED,
  NEXT_GAME_REQUESTED,
  NEXT_GAME_SUCCEEDED,
  NEXT_GAME_FAILED,
  RESET_GAME_REQUESTED,
  RESET_GAME_SUCCEEDED,
  RESET_GAME_FAILED,
} from "../actions";

function* loadGameStatus() {
  try {
    const status = yield call(api.fetchStatus);
    yield put({ type: GAME_STATUS_SUCCEEDED, status: status.response.ok });
  } catch (e) {
    yield put({ type: GAME_STATUS_FAILED, message: e.message });
  }
}

function* loadGameScore() {
  try {
    const score = yield call(api.fetchScore);
    yield put({ type: SCORE_FETCH_SUCCEEDED, score: score.response.result });
  } catch (e) {
    yield put({ type: SCORE_FETCH_FAILED, message: e.message });
  }
}

function* loadGameScoreReset() {
  try {
    const score = yield call(api.resetScore);
    yield put({ type: SCORE_RESET_SUCCEEDED, score: score.response.result });
  } catch (e) {
    yield put({ type: SCORE_RESET_FAILED, message: e.message });
  }
}

function* loadGame() {
  try {
    const game = yield call(api.fetchGame);
    yield put({ type: BOARD_FETCH_SUCCEEDED, game: game.response.result });
  } catch (e) {
    yield put({ type: BOARD_FETCH_FAILED, message: e.message });
  }
}

function* loadGameMove(index) {
  try {
    const game = yield call(api.fetchGameMove, index);
    yield put({ type: MOVE_BOARD_FETCH_SUCCEEDED, game: game.response.result });
  } catch (e) {
    yield put({ type: MOVE_BOARD_FETCH_FAILED, message: e.message });
  }
}

function* loadNextGame() {
  try {
    const game = yield call(api.fetchNextGame);
    yield put({ type: NEXT_GAME_SUCCEEDED, game: game.response.result });
  } catch (e) {
    yield put({ type: NEXT_GAME_FAILED, message: e.message });
  }
}

function* loadResetGame() {
  try {
    const game = yield call(api.fetchResetGame);
    yield put({ type: RESET_GAME_SUCCEEDED, game: game.response.result });
  } catch (e) {
    yield put({ type: RESET_GAME_FAILED, message: e.message });
  }
}

function* watchGameStatus() {
  yield takeLatest(GAME_STATUS_REQUESTED, loadGameStatus);
}

function* watchGameScore() {
  yield takeLatest(SCORE_FETCH_REQUESTED, loadGameScore);
}

function* watchGameScoreReset() {
  yield takeLatest(SCORE_RESET_REQUESTED, loadGameScoreReset);
}

function* watchGame() {
  yield takeLatest(BOARD_FETCH_REQUESTED, loadGame);
}

function* watchGameMove() {
  yield takeLatest(MOVE_BOARD_FETCH_REQUESTED, loadGameMove);
}

function* watchNextGame() {
  yield takeLatest(NEXT_GAME_REQUESTED, loadNextGame);
}

function* watchResetGame() {
  yield takeLatest(RESET_GAME_REQUESTED, loadResetGame);
}

export default function* rootSaga() {
  yield all([
    fork(watchGameStatus),
    fork(watchGameScore),
    fork(watchGameScoreReset),
    fork(watchGame),
    fork(watchGameMove),
    fork(watchNextGame),
    fork(watchResetGame),
  ]);
}
