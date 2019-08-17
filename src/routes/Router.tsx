import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import NotFoundPage from "../pages/_misc/components/NotFoundPage";
import Pomodoro from "../pages/pomodoro/components/Pomodoro";
import Portfolio from "../pages/portfolio/components/Portfolio";
import TicTacToe from "../pages/tic-tac-toe/components/Setup";
import WikipediaAPI from "../pages/wikipedia-api/components/WikipediaAPI";
import IndecisionApp from "../pages/indecision-app/components/IndecisionApp";
import TwitchAPI from "../pages/twitch-api/components/TwitchAPI";
import SimonSays from "../pages/simon-says/components/SimonSays";
import DrumMachine from "../pages/drum-machine/components/DrumMachine";
import Chatter from "../pages/chatter/components/Landing";
import configureStore from "../store/store";

const history = createBrowserHistory();
const store = configureStore();

const AppRouter: React.SFC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" component={Portfolio} exact />
          <Route path="/pomodoro" component={Pomodoro} />
          <Route path="/wikipedia" component={WikipediaAPI} />
          <Route path="/indecision-app" component={IndecisionApp} />
          <Route path="/twitch" component={TwitchAPI} />
          <Route path="/simon-says" component={SimonSays} />
          <Route path="/drum-machine" component={DrumMachine} />
          <Route path="/tic-tac-toe" component={TicTacToe} />
          <Route path="/chatter" exact component={Chatter} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default AppRouter;
