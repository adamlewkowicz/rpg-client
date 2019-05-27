import {
	$_LOAD_GAME, CHARACTER_UPDATE
} from 'rpg-shared/lib/consts';
import { normalize } from '../../utils';
import { CharacterState } from 'rpg-shared/lib/store';
import { CharacterActions } from 'rpg-shared/lib/action-types/union-types'

const initialState: CharacterState = {
	data: null,
	inventory: {},
	inventorySize: 0
}

const characterReducer = (
	state = initialState,
	action: CharacterActions
): CharacterState => {
	switch(action.type) {
		case $_LOAD_GAME: return {
			...state,
			data: action.payload.character,
			inventory: normalize(action.payload.inventory),
			inventorySize: action.payload.inventorySize
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