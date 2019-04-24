import {
  LOAD_LOCATION, UPDATE_CHARACTER,
  CHARACTER_JOIN,
  CHARACTER_LEAVE,
  CHARACTER_UPDATE,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE,
  LOAD_GAME
} from '../action-types';

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

const location = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GAME: return {
      ...state,
      location: action.payload.location,
      charId: action.payload.character.id,
      character: action.payload.character,
      characters: [...action.payload.characters, action.payload.character]
        .reduce((mergedChars, character) => ({
          ...mergedChars,
          [character.id]: character
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
    case CHARACTER_UPDATE:
      const charId = action.meta.charId || state.charId || 1;
      return {
        ...state,
        characters: {
          ...state.characters,
          [charId]: {
            ...state.characters[charId],
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

export default location;