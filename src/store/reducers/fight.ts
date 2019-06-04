import {
  FIGHT_START,
  $_FIGHT_ACTION_RESULT,
  $_FIGHT_FINISH
} from 'rpg-shared/dist/consts';
import { FightState } from 'rpg-shared/lib/store';
import { FightActions } from 'rpg-shared/lib/action-types/union-types';

const initialState: FightState = {
  id: null,
  actions: [],
  targets: [],
  status: null
}

const fightReducer = (
  state = initialState,
  action: FightActions
): FightState => {
  switch(action.type) {
    case FIGHT_START: return {
      ...state,
      ...initialState,
      status: 'STARTED'
    }
    case $_FIGHT_ACTION_RESULT: return {
      ...state,
      actions: [
        ...state.actions,
        ...action.payload
      ]
    }
    case $_FIGHT_FINISH: return {
      ...state,
      actions: [
        ...state.actions,
        ...action.payload
      ],
      status: 'FINISHED'
    }
    default: return state;
  }
}

export default fightReducer;