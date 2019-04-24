import {
  CHANGE_LOCATION
} from '../action-types';

export const changeLocation = (locationId) => ({
  type: CHANGE_LOCATION,
  meta: { locationId, io: true }
});