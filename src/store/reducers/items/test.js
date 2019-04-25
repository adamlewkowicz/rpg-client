import itemsReducer, { initialState } from './index';
import { dropItem } from '../../actions/items';

describe('items reducer', () => {

  it('matches initial state', () => {
    expect(itemsReducer(undefined, {})).toEqual(initialState)
  })

  it('should drop item', () => {
    const state = {
      ...initialState,
      inventory: {
        id: 1,
        position: 1,
        loot: {
          id: 1,
          lootedBy: 1,
          lootedAt: '2019-04-25T18:00:52.000Z'
        },
        type: {
          id: 1,
          name: 'Weeper',
          damage: 0
        }
      }
    }

    expect(
      itemsReducer(state, dropItem(1))
    ).toEqual(initialState);


    expect()
  })
});