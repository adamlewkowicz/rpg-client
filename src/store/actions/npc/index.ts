import {
  NPC_DIALOG_CLOSE, NPC_DIALOG_REQUEST
} from 'rpg-shared/dist/consts';
import { NpcActionTypes } from './interfaces';

export const npcDialogOpen = (npcId: number): NpcActionTypes => ({
  type: NPC_DIALOG_REQUEST,
  meta: { io: true, npcId }
});

export const npcDialogClose = (): NpcActionTypes => ({
  type: NPC_DIALOG_CLOSE
});

