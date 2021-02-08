import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  return {
    ...createStore(rootReducer, applyMiddleware(sagaMiddleware, logger)),
    runSaga: sagaMiddleware.run(rootSaga),
  };
}
