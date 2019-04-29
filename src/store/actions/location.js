import {
  CHANGE_LOCATION,
  UPDATE_CHARACTER,
  CHARACTER_UPDATE
} from '../action-types';

export const changeLocation = (locationId) => ({
  type: CHANGE_LOCATION,
  meta: { locationId, io: true }
});

export const updateCharacter = (payload) => ({
  type: CHARACTER_UPDATE,
  payload
});