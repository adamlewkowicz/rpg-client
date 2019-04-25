import {
  ITEM_ADD,
  ITEM_REMOVE,

  ITEM_UPDATE,
  ITEM_PICKUP,

  ITEM_DROP,
} from '../action-types';

export const moveItem = (itemId, position) => ({
  type: ITEM_UPDATE,
  payload: { data: { position }, id: itemId, itemId },
  meta: { itemId }
});

export const pickupItem = (item) => ({
  type: ITEM_PICKUP,
  payload: item,
  meta: { itemId: item.id }
});

export const dropItem = (item) => ({
  type: ITEM_DROP,
  payload: item,
  meta: { itemId: item.id }
});