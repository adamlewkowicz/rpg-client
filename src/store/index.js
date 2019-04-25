import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import websocketMiddleware from './middleware/websockets';
import { socket } from '../io';
import * as actionTypes from './action-types';
import game from './reducers/game';
import chat from './reducers/chat';
import items from './reducers/items/index';


const {
  CHARACTER_JOIN, CHANGE_LOCATION, CHARACTER_UPDATE, LOAD_GAME,
  CHARACTER_LEAVE, RECEIVE_MESSAGE,
  $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE
} = actionTypes;

const reducers = combineReducers({
  game,
  chat,
  items
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

const handleAction = (action, propagate = false) => {
  const io = !action.type.startsWith('$') // !action.type.startsWith('$') || propagate;
  store.dispatch({
    ...action, meta: { io, ...action.meta }
  });
}

socket.on(LOAD_GAME, handleAction);

socket.on(CHARACTER_JOIN, handleAction);
socket.on(CHARACTER_LEAVE, handleAction);
socket.on(CHANGE_LOCATION, handleAction);

socket.on(CHARACTER_UPDATE, handleAction);

/* Chat */
socket.on(RECEIVE_MESSAGE, handleAction);

/* Items */
socket.on($_ITEM_DROPPED_ADD, handleAction);
socket.on($_ITEM_DROPPED_REMOVE, handleAction);