import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE
} from '../action-types';
import { MESSAGE_TYPES } from '../consts';
const { PRIVATE, GROUP, LOCAL } = MESSAGE_TYPES;

const initialState = {
  private: {},
  group: {},

  local: [],
  global: []
}

const chat = (state = initialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE: return {
      ...state,
      local: [...state.local, action.payload] 
    }
    case RECEIVE_MESSAGE:
      const messageType = action.payload.type;

      switch(messageType) {
        case LOCAL: return {
          ...state,
          local: [...state.local, action.payload]
        }
        case PRIVATE:
        case GROUP: {
          const target = messageType.toLowerCase();
          const { fromCharId } = action.payload;
          const { [fromCharId]: senderMessages = [], ...rest } = state[target];
          
          return {
            ...state,
            [target]: {
              ...rest,
              [fromCharId]: [...senderMessages, action.payload]
            }
          }
        }
        default: throw new Error(`Invalid message type ${messageType}`)
      }
    default: return state;
  }
}

export default chat;