import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ioMiddleware from './io-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as types from 'rpg-shared/dist/consts';

import npcDialog from './reducers/npcDialog';
import npcShop from './reducers/npcShop';
import location from './reducers/location';
import game from './reducers/game';
import character from './reducers/character';
import chat from './reducers/chat';

const rootReducer = combineReducers({
  game,
  location,
  character,
  chat,
  npcDialog,
  npcShop
});

const composeEnhancers = composeWithDevTools({
  actionsBlacklist: [types.MOUSE_POSITION_UPDATE]
});

export const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk,
      <any>ioMiddleware
    )
  )
);

export type AppState = ReturnType<typeof rootReducer>