import {
  $_LOAD_GAME, $_CHARACTER_UPDATE,
  $_CHARACTER_JOIN, $_CHARACTER_LEAVE,
  $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE,
  $_FIGHT_ACTION_RESULT
} from 'rpg-shared/dist/consts';
import {
  CHARACTER_WIDTH, CHARACTER_HEIGHT
} from '../consts';
import { normalize } from '../../utils';
import { LocationState } from 'rpg-shared/lib/store'
import { LocationActions } from 'rpg-shared/lib/action-types/union-types';


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

  collisions: [[]],
  staticCollisions: [],
  terrainCollisions: []
}

const locationReducer = (
  state = initialState,
  action: LocationActions
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
      characters: normalize(action.payload.characters),
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
      const { [action.meta.charId]: deleted, ...characters } = state.characters;
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
      const { [action.meta.itemId]: deleted, ...droppedItems } = state.droppedItems;
      return { ...state, droppedItems };
    }
    case $_FIGHT_ACTION_RESULT:
      const { targetType, targetId, result } = action.payload;
      const property = targetType === 'CHARACTER' ? 'characters' : 'mobs';
      return {
        ...state,
        [property]: {
          ...state[property],
          [targetId]: {
            ...state[property][targetId],
            ...result
          }
        }
      }
    default: return state;
  }
}

export default locationReducer;