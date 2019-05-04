import { MOUSE_POSITION_UPDATE } from '../action-types';

export const mousePositionUpdate = (mouseX, mouseY) => ({
  type: MOUSE_POSITION_UPDATE,
  payload: { mouseX, mouseY },
  meta: { io: false }
});