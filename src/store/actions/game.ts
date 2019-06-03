import {
  MOUSE_POSITION_UPDATE,
} from 'rpg-shared/dist/consts';
import { GameActions } from 'rpg-shared/lib/action-types/union-types';

export const mousePositionUpdate = (
  mouseX: number,
  mouseY: number,
  mouseGameX: number,
  mouseGameY: number
): GameActions => ({
  type: MOUSE_POSITION_UPDATE,
  payload: { mouseX, mouseY, mouseGameX, mouseGameY },
  meta: { io: false }
});