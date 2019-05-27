import {
  $_LOAD_GAME, $_CHARACTER_UPDATE,
  $_CHARACTER_JOIN, $_CHARACTER_LEAVE,
  $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE
} from 'rpg-shared/dist/consts';
import {
  MOB_STATUS, CHARACTER_STATUS,
  CHARACTER_WIDTH, CHARACTER_HEIGHT
} from '../consts';
import { normalize } from '../../utils';
import { LocationState } from 'rpg-shared/store'

const initialState: LocationState = {
  data: null,
  width: 0,
  height: 0,
  xRange: 0, /* xSize? */
  yRange: 0, 

  mobs: {},
  npcs: {},
  characters: {},

  droppedItems: {},

  collisions: null,
  staticCollisions: [],
  terrainCollisions: []
}

const locationReducer = (
  state = initialState,
  action: any
): LocationState => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      width: 2048,
      height: 3072,
      xRange: 2048 / CHARACTER_WIDTH,
      yRange: 3072 / CHARACTER_HEIGHT,
      data: action.payload.location,
      mobs: normalize(action.payload.mobs),
      npcs: normalize(action.payload.npcs),
      characters: action.payload.characters
        // .slice(0, 2)
        .reduce((mergedChars: any, character: any) => ({
          ...mergedChars,
          [character.id]: {
            ...character,
            status: CHARACTER_STATUS.IDLE
          }
        }), {}),
      collisions: action.payload.collisions
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
    case $_CHARACTER_JOIN: return {
      ...state,
      characters: {
        ...state.characters,
        [action.payload.id]: action.payload
      }
    }
    case $_CHARACTER_LEAVE: {
      const { [action.payload]: deleted, ...characters } = state.characters;
      return { ...state, characters };
    }
    case $_ITEM_DROPPED_ADD: return {
      ...state,
      droppedItems: {
        ...state.droppedItems,
        [action.payload.id]: action.payload
      }
    }
    case $_ITEM_DROPPED_REMOVE: {
      const { [action.payload.id]: deleted, ...droppedItems } = state.droppedItems;
      return { ...state, droppedItems };
    }
    default: return state;
  }
}

export default locationReducer;