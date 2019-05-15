import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { socket } from '../io';
import * as actionTypes from './action-types';
import { createIoMiddleware } from '@art4/reduxio';

import game from './reducers/game';
import chat from './reducers/chat';
import items from './reducers/items';
import location from './reducers/location';
import battle from './reducers/battle';
import character from './reducers/character';
import npc from './reducers/npc';


const {
  CHARACTER_JOIN, CHANGE_LOCATION,
  CHARACTER_LEAVE, RECEIVE_MESSAGE,
  $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE,
  $_CHARACTER_UPDATE,
  $_LOAD_GAME,
  $_FIGHT_ACTION_RESULT,
  $_FIGHT_FINISH
} = actionTypes;

const reducers = combineReducers({
  game,
  chat,
  items,
  location,
  character,
  battle,
  npc
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const socketActions = Object
  .keys(actionTypes)
  .filter(([typeName]) => typeName.startsWith('$'));

const ioMiddleware = createIoMiddleware({
  socket,
  autoEmit: false,
  listenTo: [
    CHARACTER_JOIN, CHANGE_LOCATION,
    CHARACTER_LEAVE, RECEIVE_MESSAGE,
    $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE,
    $_CHARACTER_UPDATE,
    $_LOAD_GAME,
    $_FIGHT_ACTION_RESULT,
    $_FIGHT_FINISH
  ]
});

export const store = createStore(
  reducers,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk,
      ioMiddleware
    )
  )
);