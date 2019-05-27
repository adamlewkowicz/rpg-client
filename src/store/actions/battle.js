import {
  updateCharacter, updateCharacterStatus
} from './character'
import {
  FIGHT_START, CHARACTER_UPDATE, FIGHT_ACTION
} from 'rpg-shared/dist/consts';
import { CHARACTER_STATUS } from '../consts';

export const startFight = (mobId) => ({
  type: FIGHT_START,
  payload: mobId
});

export const startFightWithMob = (mobId) => (dispatch) => {
  dispatch(updateCharacterStatus(CHARACTER_STATUS.FIGHTING))
  dispatch(startFight(mobId));
}

export const makeFightAction = (type) => ({
  type: FIGHT_ACTION
});