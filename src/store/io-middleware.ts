import * as types from 'rpg-shared/consts';
import { socket } from '../io';
const { createIoMiddleware } = require("@art4/reduxio");

const remoteEvents = Object
  .values(types)
  .filter(type => type.startsWith('$'));

export default createIoMiddleware({
  socket,
  listenTo: remoteEvents
});