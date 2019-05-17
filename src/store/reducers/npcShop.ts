import * as Actions from 'rpg-shared/action-types';
import { NPC_SHOP_TRADE, $_NPC_SHOP_RESPONSE, NPC_SHOP_REQUEST } from 'rpg-shared/dist/consts';
import { Item } from 'rpg-shared/objects';

export interface NpcShopState {
  isLoading: boolean
  opened: boolean
  items: Item[]
  buying: number[]
  selling: number[]
}

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