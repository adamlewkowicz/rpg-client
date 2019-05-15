import {
  MOUSE_POSITION_UPDATE,
  QUEST_DIALOG_TOGGLE
} from '../action-types';
const meta = { io: false };

export const mousePositionUpdate = (mouseX, mouseY) => ({
  type: MOUSE_POSITION_UPDATE,
  payload: { mouseX, mouseY },
  meta
});