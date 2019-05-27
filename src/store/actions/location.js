import {
  CHANGE_LOCATION,
  UPDATE_CHARACTER,
  CHARACTER_UPDATE
} from 'rpg-shared/dist/consts';

export const changeLocation = (locationId) => ({
  type: CHANGE_LOCATION,
  meta: { locationId, io: true }
});