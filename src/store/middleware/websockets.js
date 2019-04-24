import { socket } from '../../io';
import {
  CHARACTER_JOIN,
  CHANGE_LOCATION,
  CHARACTER_UPDATE,
  LOAD_GAME,
} from '../action-types';


const websockets = store => next => action => {
  const { meta = {}} = action;
  const { io = true } = meta;

  const result = next(action);

  if (io === true) {
    socket.emit(action.type, action);   
  }

}

export default websockets;