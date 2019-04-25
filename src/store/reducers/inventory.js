import {
  LOAD_GAME,

  ITEM_DROP,
  ITEM_PICKUP,
  ITEM_UPDATE,

  $_ITEM_ADD_DROPPED,
  $_ITEM_REMOVE_DROPPED
} from '../action-types';
import { normalize } from '../../utils';

const initialState = {
  inventory: {},
  droppedItems: {},

  inventoryLimit: null
}

const inventory = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_GAME: return {
      ...state,
      inventory: normalize(action.payload.inventory),
      inventoryLimit: 30
    }
    case ITEM_UPDATE: 
      const { [action.meta.id]: desiredItem, ...items } = state.inventory;
      return {
        ...state,
        inventory: {
          ...items,
          [desiredItem.id]: { ...desiredItem, ...action.payload } 
        }
      }

    case ITEM_DROP: {
      const { [action.payload]: droppedItem, ...inventory } = state.inventory;
      return {
        ...state,
        inventory,
        droppedItems: {
          ...state.droppedItems,
          [droppedItem.id]: droppedItem
        }
      }
    }
    case ITEM_PICKUP: {
      const { [action.payload]: pickedItem, ...droppedItems } = state.droppedItems;
      return {
        ...state,
        droppedItems,
        inventory: {
          ...state,
          [pickedItem.id]: pickedItem
        }
      }
    }
    case $_ITEM_ADD_DROPPED: return {
      ...state,
      droppedItems: {
        ...state.droppedItems,
        [action.payload.id]: action.payload
      }
    }
    case $_ITEM_REMOVE_DROPPED: {
      const { [action.payload]: deleted, ...droppedItems } = state.droppedItems;
      return { ...state, droppedItems };
    }
    default: return state;
  }
}

export default inventory;