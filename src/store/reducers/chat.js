import {
  SEND_MESSAGE,
  RECEIVE_MESSAGE
} from '../action-types';

const charIdOne = 1;
const charIdTwo = 2;

const groupId = 1;

const initialState = {
  privateMessages: {
    [charIdOne]: [],
    [charIdTwo]: []
  },
  groupMessages: {
    [groupId]: []
  },
  localMessages: {},

  private: {

  },

  local: [],
  global: []
}

const chat = (state = initialState, action) => {
  switch(action.type) {
    case SEND_MESSAGE: return {
      ...state,
      local: [...state.local, action.payload] 
    }
    case RECEIVE_MESSAGE: return {
      ...state,
      local: [...state.local, action.payload]
    }
    default: return state;
  }
}

export default chat;