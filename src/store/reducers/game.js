import {
  LOAD_LOCATION,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE,

  $_LOAD_GAME,
} from '../action-types';
import { CHARACTER_STATUS } from '../consts';

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  CHANGING_LOCATION: 'CHANGING_LOCATION'
}

const initialState = {
  status: STATUS.LOADING,
  width: 512,
  height: 512
}

const game = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      status: STATUS.IDLE
    }
    case LOAD_LOCATION: return action.payload;
    case REQUEST_LOCATION_CHANGE: return {
      ...state,
      location: null,
      status: STATUS.CHANGING_LOCATION
    }
    case CHANGE_LOCATION: {
      const { [state.charId]: myCharacter } = state.characters;
      const { location, characters } = action.payload;
      return {
        ...state,
        location: location,
        characters: { [state.charId]: myCharacter, ...characters },
        status: STATUS.IDLE
      }
    }
    default: return state;
  }
}

export default game;