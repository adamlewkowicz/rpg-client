import {
  FIGHT_START
} from '../action-types';

const initialState = {
  fightId: null
}

const battleReducer = (state = initialState, action) => {
  switch(action.type) {
    case FIGHT_START: return {
      ...state,
    }
    default: return state;
  }
}

export default battleReducer;