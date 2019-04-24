import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import location from './reducers/location';

const reducers = combineReducers({
  location
});

export const store = createStore(
  reducers,
  applyMiddleware(thunk)
);