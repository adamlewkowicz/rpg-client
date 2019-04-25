import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import websocketMiddleware from './middleware/websockets';
import { socket } from '../io';
import * as actionTypes from './action-types';
import game from './reducers/game';

const {
  CHARACTER_JOIN, CHANGE_LOCATION, CHARACTER_UPDATE, LOAD_GAME,
  CHARACTER_LEAVE
} = actionTypes;

const reducers = combineReducers({
  game
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk,
      websocketMiddleware
    )
  )
);

const handleAction = (action, propagate) => store.dispatch({
  ...action, meta: { io: propagate, ...action.meta }
});

socket.on(LOAD_GAME, handleAction);

socket.on(CHARACTER_JOIN, handleAction);
socket.on(CHARACTER_LEAVE, handleAction);
socket.on(CHANGE_LOCATION, handleAction);

socket.on(CHARACTER_UPDATE, handleAction);