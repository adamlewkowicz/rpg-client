import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE,
  $_MESSAGE_RECEIVE,
  MESSAGE_SEND
} from 'rpg-shared/consts';
import { MESSAGE_TYPES } from '../consts';
import { ChatState } from 'rpg-shared/store';
import { ChatActions } from 'rpg-shared/action-types/union-types';
const { PRIVATE, GROUP, LOCAL } = MESSAGE_TYPES;

const initialState: ChatState = {
  private: {},
  group: {},
  local: [],
  global: []
}

const chatReducer = (
  state = initialState,
  action: ChatActions
): ChatState => {
  switch(action.type) {
    case MESSAGE_SEND: 
    case SEND_MESSAGE: return {
      ...state,
      local: [...state.local, action.payload] 
    }
    case $_MESSAGE_RECEIVE:
    case RECEIVE_MESSAGE:
      const messageType = action.payload.type;

      switch(action.payload.type) {
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

export default chatReducer;