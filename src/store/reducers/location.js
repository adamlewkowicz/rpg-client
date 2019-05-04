import {
  $_LOAD_GAME, $_CHARACTER_UPDATE,
  $_CHARACTER_JOIN, $_CHARACTER_LEAVE,
  $_ITEM_DROPPED_ADD, $_ITEM_DROPPED_REMOVE
} from '../action-types';
import {
  MOB_STATUS, CHARACTER_STATUS,
  CHARACTER_WIDTH, CHARACTER_HEIGHT
} from '../consts';

const initialState = {
  data: null,
  width: 0,
  height: 0,
  xRange: 0, /* xSize? */
  yRange: 0, 

  mobs: {},
  npcs: {},
  characters: {},

  droppedItems: {},

  collisions: [],
  /* combine static collisions - npcs and terrain ? */
  /* Server output - proposal for new format
    [
      [null, { type: 'TERRAIN' }, { type: 'NPC', id: 1, data: null }]
    ]
  */
  staticCollisions: [],
  terrainCollisions: []
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      width: 2048,
      height: 3072,
      xRange: 2048 / CHARACTER_WIDTH,
      yRange: 3072 / CHARACTER_HEIGHT,
      data: action.payload.location,
      mobs: {
        1: {
          name: 'Eagle',
          level: 12,
          status: MOB_STATUS.IDLE,
          x: 3,
          y: 5,
          type: { id: 1, damage: 12 }
        }
      },
      characters: action.payload.characters
        // .slice(0, 2)
        .reduce((mergedChars, character) => ({
          ...mergedChars,
          [character.id]: {
            ...character,
            status: CHARACTER_STATUS.IDLE
          }
        }), {}),
      collisions: [
        ...action.payload.collisions,
        // ...action.payload.npcs.reduce((merged, npc) => ({
        //   ...merged,
        //   [npc.x]: npc.y
        // }), {}),
        // ...action.payload.mobs.reduce((merged, mob) => ({
        //   ...merged,
        //   [mob.x]: mob.y
        // }), {})
      ]
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