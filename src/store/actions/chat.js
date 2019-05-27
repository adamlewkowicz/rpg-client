import {
  MESSAGE_SEND
} from 'rpg-shared/dist/consts';
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
  type: MESSAGE_SEND,
  payload: {
    type: LOCAL,
    data,
    to: null
  }
});

export const sendPrivateMessage = (data, to) => ({
  type: MESSAGE_SEND,
  payload: {
    type: PRIVATE,
    data,
    to
  }
});

export const sendGroupMessage = (data, to) => ({
  type: MESSAGE_SEND,
  payload: {
    type: GROUP,
    data,
    to
  }
});