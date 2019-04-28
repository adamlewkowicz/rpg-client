import {
  LOAD_LOCATION, UPDATE_CHARACTER,
  CHARACTER_JOIN,
  CHARACTER_LEAVE,
  CHARACTER_UPDATE,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE,

  $_LOAD_GAME,
  $_CHARACTER_UPDATE,
} from '../action-types';
import { CHARACTER_STATUS } from '../consts';

const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  CHANGING_LOCATION: 'CHANGING_LOCATION'
}

const initialState = {
  charId: null,
  status: STATUS.LOADING,
  character: null, /* Deprecated - extract own char from characaters */
  characters: {},

  location: null
}

const game = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      location: action.payload.location,
      charId: action.payload.character.id,
      character: action.payload.character,
      characters: [...action.payload.characters, action.payload.character]
        .reduce((mergedChars, character) => ({
          ...mergedChars,
          [character.id]: {
            ...character,
            status: CHARACTER_STATUS.IDLE
          }
        }), {}),
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
    case $_CHARACTER_UPDATE: return {
      ...state,
      characters: {
        ...state.characters,
        [action.meta.charId]: {
          ...state.characters[action.meta.charId],
          ...action.payload
        }
      }
    }
    case CHARACTER_JOIN: return {
      ...state,
      characters: {
        ...state.characters,
        [action.payload.id]: action.payload
      }
    }
    case CHARACTER_LEAVE: 
      const { [action.payload]: deleted, ...characters } = state.characters;
      return { ...state, characters };
    default: return state;
  }
}

export default game;