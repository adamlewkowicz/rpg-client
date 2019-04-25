import React, { useEffect } from 'react';
import { connect } from 'react-redux';

class Triggers extends React.Component {

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      const movementKeys = {
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd'
      }
      const key = movementKeys[event.keyCode];

      const { charId } = this.props.game;
      let { positionX, positionY } = this.props.game.characters[charId];

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