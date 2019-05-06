import { socket } from '../../io';


const websocket = store => next => action => {
  const { meta = {}} = action;
  const { io = true } = meta;

  next(action);

  if (io === true && !action.type.startsWith('$')) {
    socket.emit(action.type, action, store.dispatch);
  }

}

export default websocket;