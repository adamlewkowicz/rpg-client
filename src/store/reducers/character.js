import {
  $_LOAD_GAME, CHARACTER_UPDATE
} from '../action-types';
import { normalize } from '../../utils';

const initialState = {
  data: null,
  inventory: {},
  inventorySize: null,

  status: null, /* Depr? */
}

const characterReducer = (state = initialState, action) => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      data: action.payload.character,
      inventory: normalize(action.payload.inventory),
      inventorySize: 30
    }
    case CHARACTER_UPDATE: return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      }
    }
    default: return state;
  }
}

export default characterReducer;