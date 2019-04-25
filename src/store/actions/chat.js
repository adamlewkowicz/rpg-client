import {
  SEND_MESSAGE
} from '../action-types';
import { MESSAGE_TYPES } from '../consts';
const { PRIVATE, GROUP, LOCAL } = MESSAGE_TYPES;

/*
  Types of message
  - PRIVATE - charId / socketId ?
  - GROUP - group message
  - CLAN - clan message
  - LOCAL - current location
  - GLOBAL - admin only - sends to all sockets
*/

export const sendLocalMessage = (data) => ({
  type: SEND_MESSAGE,
  payload: {
    type: LOCAL,
    data,
    to: null
  }
});

export const sendPrivateMessage = (data, to) => ({
  type: SEND_MESSAGE,
  payload: {
    type: PRIVATE,
    data,
    to
  }
});

export const sendGroupMessage = (data, to) => ({
  type: SEND_MESSAGE,
  payload: {
    type: GROUP,
    data,
    to
  }
});