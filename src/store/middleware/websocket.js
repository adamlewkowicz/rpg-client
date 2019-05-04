import { socket } from '../../io';


const websocket = store => next => action => {
  const { meta = {}} = action;
  const { io = true, callbackAction } = meta;

  next(action);

  if (io === true && !action.type.startsWith('$')) {
    if (callbackAction) {
      socket.emit(action.type, action, (actionType, action) =>
        store.dispatch(action)
      );
    } else {
      socket.emit(action.type, action);   
    }
  }

}

export default websocket;