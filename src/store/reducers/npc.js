import {
  NPC_DIALOG_REQUEST,
  $_NPC_DIALOG_RESPONSE,
  NPC_DIALOG_CLOSE
} from '../action-types';

const initialState = {
  data: null,
  opened: false,
  isLoading: false,
  step: 0
}

const npc = (state = initialState, action) => {
  switch(action.type) {
    case NPC_DIALOG_REQUEST: return {
      ...state,
      opened: true,
      isLoading: true 
    }
    case $_NPC_DIALOG_RESPONSE: return {
      ...state,
      data: action.payload,
      isLoading: false
    }
    case NPC_DIALOG_CLOSE: return initialState;
    default: return state;
  }
}

export default npc;