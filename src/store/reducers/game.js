import {
  LOAD_LOCATION,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE,
  MOUSE_POSITION_UPDATE,

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
  width: 544,
  height: 528,
  charWidth: 32,
  charHeight: 48,
  mouseX: 0,
  mouseY: 0
}

const game = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      status: STATUS.IDLE
    }
    case MOUSE_POSITION_UPDATE:
      const { mouseX, mouseY } = action.payload;
      return { ...state, mouseX, mouseY };
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