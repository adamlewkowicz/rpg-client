import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import websocketMiddleware from './middleware/websockets';
import { socket } from '../io';
import * as actionTypes from './action-types';
import location from './reducers/location';

const { CHARACTER_JOIN, CHANGE_LOCATION, CHARACTER_UPDATE, LOAD_GAME } = actionTypes;

const reducers = combineReducers({
  location
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

const handleAction = action => store.dispatch(action);

socket.on(CHARACTER_JOIN, (action) => store.dispatch({ type: CHARACTER_JOIN, ...action }));
socket.on(CHANGE_LOCATION, handleAction);
socket.on(CHARACTER_UPDATE, console.log);
socket.on(LOAD_GAME, handleAction);