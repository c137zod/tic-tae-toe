import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "../components/pages/Game";
import Score from "../components/pages/Score";
import Routing from "../components/routing/Routing";
import configureStore from "../store/configureStore";
import { history } from "../services";

const store = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Routing />
          <Switch>
            <Route exact path="/" component={Game} />
            <Route path="*" component={Score} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}
