import {
  $_NPC_DIALOG_DATA, QUEST_DIALOG_TOGGLE,
  NPC_DIALOG_TOGGLE 
} from '../action-types';

const initialState = {
  data: null,
  opened: false,
  isLoading: false,
  step: 0
}

const npc = (state = initialState, action) => {
  switch(action.type) {
    case QUEST_DIALOG_TOGGLE:
    case NPC_DIALOG_TOGGLE: return {
      ...state,
      isLoading: !state.opened,
      opened: !state.opened
    }
    case $_NPC_DIALOG_DATA: return {
      ...state,
      data: action.payload,
      isLoading: false,
      step: 0
    }
    default: return state;
  }
}

export default npc;