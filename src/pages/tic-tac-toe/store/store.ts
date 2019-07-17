import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import playerReducer from "../reducers/player.reducer";
import boardReducer from "../reducers/board.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (): any => {
  const store = createStore(
    combineReducers({
      player: playerReducer,
      board: boardReducer,
    }),
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
};