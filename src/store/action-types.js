
export const LOAD_LOCATION = 'LOAD_LOCATION';
export const UPDATE_CHARACTER = 'UPDATE_CHARACTER';
export const CHARACTER_UPDATE = 'CHARACTER_UPDATE';
export const CHARACTER_LEAVE = 'CHARACTER_LEAVE';
export const CHARACTER_JOIN = 'CHARACTER_JOIN';
export const CHANGE_LOCATION = 'CHANGE_LOCATION';
export const REQUEST_LOCATION_CHANGE = 'REQUEST_LOCATION_CHANGE';
export const MOUSE_POSITION_UPDATE = 'MOUSE_POSITION_UPDATE';

export const $_LOAD_GAME = '$_LOAD_GAME';

export const $_CHARACTER_UPDATE = '$_CHARACTER_UPDATE';
export const $_CHARACTER_JOIN = '$_CHARACTER_JOIN';
export const $_CHARACTER_LEAVE = '$_CHARACTER_LEAVE';

/* Chat */
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

/* Inventory */
export const ITEM_ADD = 'ITEM_ADD';
export const ITEM_UPDATE = 'ITEM_UPDATE';
export const ITEM_REMOVE = 'ITEM_REMOVE';

export const ITEM_PICKUP = 'ITEM_PICKUP';
export const ITEM_DROP = 'ITEM_DROP';

export const $_ITEM_DROPPED_ADD = '$_ITEM_DROPPED_ADD';
export const $_ITEM_DROPPED_REMOVE = '$_ITEM_DROPPED_REMOVE';

// export const $ITEM_ADD_DROPPED = '$ITEM_ADD_DROPPED';
// export const $ITEM_REMOVE_DROPPED = '$ITEM_REMOVE_DROPPED';

/* Battle */
export const FIGHT_START = 'FIGHT_START';
export const FIGHT_ACTION = 'FIGHT_ACTION';

export const $_FIGHT_ACTION_RESULT = '$_FIGHT_ACTION_RESULT';
export const $_FIGHT_FINISH = '$_FIGHT_FINISH';

/* Npc */
export const NPC_DIALOG_REQUEST = 'NPC_DIALOG_REQUEST';
export const NPC_DIALOG_CLOSE = 'NPC_DIALOG_CLOSE';
export const $_NPC_DIALOG_RESPONSE = '$_NPC_DIALOG_RESPONSE';

/* Syntax proposal for dispatch-only responses (types that should not be listened by socket) */
export const $_NPC_DIALOG_RECEIVE = '[dispatch] NPC_DIALOG_RECEIVE';
/* [dispatch] [$] [$$] $$ # */