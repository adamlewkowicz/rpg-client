import {
  LOAD_LOCATION,
  CHANGE_LOCATION,
  REQUEST_LOCATION_CHANGE,
  MOUSE_POSITION_UPDATE,
  $_LOAD_GAME,
} from 'rpg-shared/dist/consts';
import { GameState } from 'rpg-shared/lib/store';
import { GameActions } from 'rpg-shared/lib/action-types/union-types';


const initialState: GameState = {
  status: 'LOADING',
  width: 544,
  height: 528,
  charWidth: 32,
  charHeight: 48,
  mouseX: 0,
  mouseY: 0,
  mouseGameX: 0,
  mouseGameY: 0
}

const gameReducer = (
  state = initialState,
  action: GameActions
): GameState => {
  switch(action.type) {
    case $_LOAD_GAME: return {
      ...state,
      status: 'IDLE'
    }
    case MOUSE_POSITION_UPDATE: return {
      ...state,
      mouseX: action.payload.mouseX,
      mouseY: action.payload.mouseY,
      mouseGameX: action.payload.mouseGameX,
      mouseGameY: action.payload.mouseGameY
    }
    /* WIP */
    case LOAD_LOCATION: return state;
    case REQUEST_LOCATION_CHANGE: return {
      ...state,
      status: 'CHANGING_LOCATION'
    }
    case CHANGE_LOCATION: return {
      ...state,
      status: 'IDLE'
    }
    default: return state;
  }
}

export default gameReducer;