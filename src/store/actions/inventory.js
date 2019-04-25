import {
  ITEM_ADD,
  ITEM_UPDATE,
  ITEM_REMOVE
} from '../action-types';

export const moveItem = (itemId, position) => ({
  type: ITEM_UPDATE,
  payload: { position, itemId },
  meta: { io: false, itemId }
});

export const pickupItem = (itemId) => ({
  type: ITEM_ADD,
  payload: itemId,
  meta: { itemId }
});

export const dropItem = (itemId) => ({
  type: ITEM_REMOVE,
  payload: itemId,
  meta: { itemId }
});