import {
  CHANGE_LOCATION,
  UPDATE_CHARACTER,
  CHARACTER_UPDATE
} from 'rpg-shared/dist/consts';

export const updateCharacter = (payload) => ({
  type: CHARACTER_UPDATE,
  payload
});

export const updateCharacterStatus = (status) => ({
  type: CHARACTER_UPDATE,
  payload: { status }
});