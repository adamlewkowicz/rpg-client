import {
  LOAD_GAME,

  ITEM_DROP,
  ITEM_PICKUP,
  ITEM_UPDATE,

  $_ITEM_DROPPED_ADD,
  $_ITEM_DROPPED_REMOVE
} from '../../action-types';
import { normalize } from '../../../utils';

export const initialState = {
  inventory: {},
  dropped: {},

  inventoryLimit: null
}

const items = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GAME: return {
      ...state,
      inventory: normalize(action.payload.inventory),
      inventoryLimit: 30
    }
    case ITEM_UPDATE:
      const { [action.payload.id]: desiredItem, ...items } = state.inventory;
      return {
        ...state,
        inventory: {
          ...items,
          [desiredItem.id]: { ...desiredItem, ...action.payload.data } 
        }
      }

    case ITEM_DROP: {
      const { [action.payload.id]: droppedItem, ...inventory } = state.inventory;
      return {
        ...state,
        inventory,
        dropped: {
          ...state.dropped,
          [droppedItem.id]: droppedItem
        }
      }
    }
    case ITEM_PICKUP: {
      const { [action.payload.id]: pickedItem, ...dropped } = state.dropped;
      return {
        ...state,
        dropped,
        inventory: {
          ...state.inventory,
          [pickedItem.id]: pickedItem
        }
      }
    }
    case $_ITEM_DROPPED_ADD: return {
      ...state,
      dropped: {
        ...state.dropped,
        [action.payload.id]: action.payload
      }
    }
    case $_ITEM_DROPPED_REMOVE: {
      const { [action.payload.id]: deleted, ...dropped } = state.dropped;
      return { ...state, dropped };
    }
    default: return state;
  }
}

export default items;