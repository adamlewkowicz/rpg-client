import {
  NPC_DIALOG_CLOSE, NPC_DIALOG_REQUEST
} from 'rpg-shared/dist/consts';

interface NpcDialogOpen {
  type: typeof NPC_DIALOG_REQUEST,
  meta: {
    io: boolean,
    npcId: number
  }
}

interface NpcDialogClose {
  type: typeof NPC_DIALOG_CLOSE
}


export type NpcActionTypes = NpcDialogOpen | NpcDialogClose ;