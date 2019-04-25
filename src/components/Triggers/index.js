import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { sendPrivateMessage, sendLocalMessage } from '../../store/actions/chat';

class Triggers extends React.Component {

  state = {
    message: ''
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
        <button onClick={() => this.props.dispatch(sendLocalMessage('Hello world'))}>
          Send message
        </button>
        <button onClick={() => this.props.dispatch(sendPrivateMessage('Hello world', this.state.message))}>
          Send private message
        </button>
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })} 
        />
  
      </>
    )
  }
}

const TriggersWithStore = connect(
  (state) => ({ game: state.game }),
  (dispatch) => ({
    increment: () => dispatch({ type: 'INC' }),
    dispatch
  })
)(Triggers);

export { TriggersWithStore as Triggers };