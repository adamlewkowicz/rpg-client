import { socket } from '../../io';
import {
  CHARACTER_JOIN
} from '../action-types';

socket.on(CHARACTER_JOIN, (action) => store.dispatch({ type: CHARACTER_JOIN, ...action }))

const websockets = store => next => action => {
  const { io = false } = action.meta;

  const result = next(action);

  if (action.meta.io === true) {
    socket.emit(action.type, action);   
  }
}

export default websockets;