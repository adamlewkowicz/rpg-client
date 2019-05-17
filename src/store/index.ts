import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import ioMiddleware from './io-middleware';

import npcDialog from './reducers/npcDialog';

const rootReducer = combineReducers({
  npcDialog
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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