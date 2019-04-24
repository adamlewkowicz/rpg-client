import {
  LOAD_LOCATION, UPDATE_CHARACTER,
  CHARACTER_JOIN,
  CHARACTER_LEAVE,
  CHARACTER_UPDATE,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE
} from '../action-types';

const STATUS = {
  IDLE: 'IDLE',
  CHANGING_LOCATION: 'CHANGING_LOCATION'
}

const initialState = {
  locationName: null,
  locationId: null,
  charId: null,
  status: STATUS.IDLE,
  characters: {
    1: { id: 1, positionX: 42, positionY: 12 }
  },

  location: {}
}

const location = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_LOCATION: return action.payload;
    case REQUEST_LOCATION_CHANGE: return {
      ...state,
      locationId: action.meta.locationId,
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
      const charId = action.meta.charId || state.charId;
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
        [action.meta.charId]: action.payload
      }
    }
    case CHARACTER_LEAVE: 
      const { [action.payload.charId]: deleted, ...characters } = state.characters;
      return { ...state, characters };
    default: return state;
  }
}

export default location;