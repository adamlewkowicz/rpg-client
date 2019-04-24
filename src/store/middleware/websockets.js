import { socket } from '../../io';
import {
  CHARACTER_JOIN,
  CHANGE_LOCATION
} from '../action-types';

const handleAction = (type, store) => (action) => store.dispatch({ type, ...action });

const websockets = store => next => action => {
  const { meta = {}} = action;
  const { io = true } = meta;

  const result = next(action);

  if (io === true) {
    socket.emit(action.type, action);   
  }

  socket.on(CHARACTER_JOIN, (action) => store.dispatch({ type: CHARACTER_JOIN, ...action }));
  // socket.on(CHANGE_LOCATION, (action) => store.dispatch({ type: CHANGE_LOCATION, ...action }));
  socket.on(CHANGE_LOCATION, handleAction(CHANGE_LOCATION, store));
}

export default websockets;