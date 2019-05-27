import {
  $_MESSAGE_RECEIVE,
  MESSAGE_SEND,
  $_MESSAGE_ACKNOWLEDGE
} from 'rpg-shared/lib/consts';
import { ChatState } from 'rpg-shared/lib/store';
import { ChatActions } from 'rpg-shared/lib/action-types/union-types';

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
    case $_MESSAGE_RECEIVE:
      switch(action.payload.type) {
        case 'LOCAL': return {
          ...state,
          local: [...state.local, action.payload]
        }
        case 'GLOBAL': return {
          ...state,
          global: [...state.global, action.payload]
        }
        case 'PRIVATE': {
          const { [action.meta.to as any]: prevMessages = [], ...rest } = state.private;
          return {
            ...state,
            private: {
              ...rest,
              [action.meta.to as any]: [...prevMessages, action.payload]
            }
          }
        }
        case 'GROUP': {
          const { [action.meta.to as any]: prevMessages = [], ...rest } = state.group;
          return {
            ...state,
            group: {
              ...rest,
              [action.meta.to as any]: [...prevMessages, action.payload]
            }
          }
        }
        default: return state;
      }
      case $_MESSAGE_ACKNOWLEDGE: return {
        ...state,
        local: state.local.map(msg => 
          msg.id === action.meta.prevId
            ? { ...msg, id: action.meta.nextId }
            : msg 
        )
      }
    default: return state;
  }
}

export default chatReducer;