import {
  LOAD_LOCATION, UPDATE_CHARACTER,
  CHARACTER_JOIN,
  CHARACTER_LEAVE,
  CHARACTER_UPDATE
} from '../action-types';

const initialState = {
  locationName: null,
  characters: {
    1: { id: 1, positionX: 42, positionY: 12 }
  }
}

const location = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_LOCATION: return action.payload;
    case CHARACTER_UPDATE: return {
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