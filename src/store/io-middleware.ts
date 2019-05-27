import * as types from 'rpg-shared/lib/consts';
import { socket } from '../io';
import { createIoMiddleware } from '@art4/reduxio';

const remoteEvents = Object
  .values(types)
  .filter(type => type.startsWith('$'));

export default createIoMiddleware({
  socket,
  listenTo: remoteEvents
});