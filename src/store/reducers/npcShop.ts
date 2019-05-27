import * as Actions from 'rpg-shared/lib/action-types';
import { NPC_SHOP_TRADE, $_NPC_SHOP_RESPONSE, NPC_SHOP_REQUEST } from 'rpg-shared/lib/consts';
import { Item } from 'rpg-shared/lib/objects';
import { NpcShopState } from 'rpg-shared/lib/store';

const initialState: NpcShopState = {
  isLoading: false,
  opened: false,
  items: [],
  buying: [],
  selling: []
}

const npcShopReducer = (
  state = initialState,
  action: Actions.NpcShopActions
): NpcShopState => {
  switch(action.type) {
    case NPC_SHOP_REQUEST: return {
      ...state,
      opened: true,
      isLoading: true
    }
    case $_NPC_SHOP_RESPONSE: return {
      ...state,
      isLoading: false,
      items: action.payload.items
    }
    case NPC_SHOP_TRADE: return {
      ...state
    }
    default: return state;
  }
}

export default npcShopReducer;