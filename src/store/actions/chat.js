import {
  SEND_MESSAGE
} from '../action-types';
import { MESSAGE_TYPES } from '../consts';

/*
  Types of message
  - PRIVATE - charId / socketId ?
  - GROUP - group message
  - CLAN - clan message
  - LOCAL - current location
  - GLOBAL - admin only - sends to all sockets
*/
export const sendMessage = (data, to = null, type = MESSAGE_TYPES.LOCAL) => ({
  type: SEND_MESSAGE,
  payload: { to, type, data }
});