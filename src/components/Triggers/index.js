import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { sendPrivateMessage, sendLocalMessage } from '../../store/actions/chat';
import { dropItem, pickupItem, moveItem } from '../../store/actions/items';

class Triggers extends React.Component {

  state = {
    message: 'o wiadomosc 👽',
    receiverId: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      const movementKeys = {
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd'
      }
      const key = movementKeys[event.keyCode];

      const { charId, characters } = this.props.game;
      const { [charId]: myCharacter = {} } = characters;
      let { positionX = 0, positionY = 0 } = myCharacter;

      switch(key) {
        case 'w':
          positionY--;
          break;
        case 'a':
          positionX--;
          break;
        case 's':
          positionY++;
          break;
        case 'd':
          positionX++;
          break;
        default: return;
      }

      this.props.dispatch({
        type: 'CHARACTER_UPDATE',
        payload: { positionX, positionY },
        meta: { charId, key }
      });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown');
  }

  render() {
    return (
      <>
        <button onClick={() => this.props.dispatch({
          type: 'REQUEST_LOCATION_CHANGE',
          payload: 1
        })}>
          Change location to Novigrad
        </button>
        <button onClick={() => this.props.dispatch({
          type: 'REQUEST_LOCATION_CHANGE',
          payload: 2
        })}>
          Change location to Yard
        </button>
        <br />
        <button onClick={() => this.props.dispatch(sendLocalMessage(this.state.message))}>
          Send message
        </button>
        <button onClick={() => this.props.dispatch(sendPrivateMessage(this.state.message, this.state.receiverId))}>
          Send private message
        </button>
        Message
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })} 
        />
        To:
        <input
          type="text"
          value={this.state.receiverId}
          onChange={e => this.setState({ receiverId: e.target.value })} 
        />

        <br />
        <button onClick={() => this.props.dispatch(dropItem(this.props.items.inventory[this.state.message]))}>
          Drop item ({this.state.message})
        </button>
        <button onClick={() => this.props.dispatch(pickupItem(this.props.items.dropped[this.state.message]))}>
          Pickup item ({this.state.message})
        </button>
        <button onClick={() => this.props.dispatch(moveItem(this.state.message, 41))}>
          Move item - next position ({this.state.message})
        </button>
      </>
    )
  }
}

const TriggersWithStore = connect(
  ({ items, game }) => ({ items, game }),
  (dispatch) => ({
    increment: () => dispatch({ type: 'INC' }),
    dispatch
  })
)(Triggers);

export { TriggersWithStore as Triggers };