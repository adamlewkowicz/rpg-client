import {
  FIGHT_START,
  $_FIGHT_ACTION_RESULT,
  $_FIGHT_FINISH
} from '../action-types';

const initialState = {
  fightId: null,
  actions: [],
  finished: false
}

const battleReducer = (state = initialState, action) => {
  switch(action.type) {
    case FIGHT_START: return {
      ...state,
      finished: false
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
      finished: true
    }
    default: return state;
  }
}

export default battleReducer;