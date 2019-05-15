import {
  NPC_DIALOG_CLOSE, NPC_DIALOG_REQUEST
} from '../action-types';

export const npcDialogOpen = (npcId: number) => ({
  type: NPC_DIALOG_REQUEST,
  meta: { io: true, npcId }
});

export const npcDialogClose = () => ({
  type: NPC_DIALOG_CLOSE
});