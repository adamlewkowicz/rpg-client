import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import location from './reducers/location';

const reducers = combineReducers({
  location
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(
      thunk
    )
  )
);