import * as Actions from 'rpg-shared/action-types';
import { NPC_DIALOG_REQUEST, $_NPC_DIALOG_RESPONSE } from 'rpg-shared/dist/consts';
import {  } from 'rpg-shared/objects';

export interface NpcDialogState {
  data: any
  opened: boolean
  isLoading: boolean
  step: number
}

const initialState: NpcDialogState = {
  data: null,
  opened: false,
  isLoading: false,
  step: 0
}

const npcDialogReducer = (
  state = initialState,
  action: Actions.NpcDialogActions
): NpcDialogState => {
  switch(action.type) {
    case NPC_DIALOG_REQUEST: return {
      ...state,
      opened: true,
      isLoading: true
    }
    case $_NPC_DIALOG_RESPONSE: return {
      ...state,
      isLoading: false,
      data: action.payload
    }
    default: return state;
  }
}

export default npcDialogReducer;