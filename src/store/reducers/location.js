import { $_LOAD_GAME } from '../action-types';
import { MOB_STATUS } from '../consts';

const initialState = {
  mobs: {},

  characters: {},
  droppedItems: {}
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      mobs: {
        1: {
          name: 'Eagle',
          level: 12,
          status: MOB_STATUS.IDLE,
          type: { id: 1, damage: 12 }
        }
      }
    }
    default: return state;
  }
}

export default locationReducer;