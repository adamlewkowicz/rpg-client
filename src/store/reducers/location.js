import {
  LOAD_LOCATION, UPDATE_CHARACTER,
  CHARACTER_JOIN,
  CHARACTER_LEAVE,
  CHARACTER_UPDATE,
  CHANGE_LOCATION
} from '../action-types';

const initialState = {
  locationName: null,
  locationId: null,
  charId: null,
  characters: {
    1: { id: 1, positionX: 42, positionY: 12 }
  },

  location: {}
}

const location = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_LOCATION: return action.payload;
    case CHANGE_LOCATION:
      const { [state.charId]: myCharacter } = state.characters;
      return {
        ...state,
        characters: { [state.charId]: myCharacter, ...characters }
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