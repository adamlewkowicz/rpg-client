import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ioMiddleware from './io-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as types from 'rpg-shared/dist/consts';

import npcDialog from './reducers/npcDialog';

const rootReducer = combineReducers({
  npcDialog
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
      ioMiddleware
    )
  )
);

export type AppState = ReturnType<typeof rootReducer>