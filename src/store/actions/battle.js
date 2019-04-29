import {
  updateCharacter
} from './location'
import { FIGHT_START } from '../action-types';
import { CHARACTER_STATUS } from '../consts';

export const startFight = () => ({
  type: FIGHT_START
});

export const startFightWithMob = (mobId) => (dispatch) => {
  dispatch(updateCharacter({ status: CHARACTER_STATUS.FIGHTING }));
  dispatch(startFight());
}

export const fightAction = (type) => (dispatch) => {

}