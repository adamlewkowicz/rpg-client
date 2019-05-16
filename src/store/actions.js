import * as locationActions from './actions/location';
import * as itemsActions from './actions/items';
import * as chatActions from './actions/chat';
import * as battleActions from './actions/battle';
import * as characterActions from './actions/character';
import * as gameActions from './actions/game';
import * as npcActions from './actions/npc/index';


export default {
  ...locationActions,
  ...itemsActions,
  ...characterActions,
  ...battleActions,
  ...gameActions,
  ...npcActions
}