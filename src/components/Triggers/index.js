import React, { useEffect } from 'react';
import { connect } from 'react-redux';


const Triggers = ({ dispatch, location }) => {

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const movementKeys = {
        87: 'w',
        65: 'a',
        83: 's',
        68: 'd'
      }
      const key = movementKeys[event.keyCode];
      const charId = 1 // location.charId;
      let { positionX, positionY } = location.characters[charId];

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

      dispatch({
        type: 'CHARACTER_UPDATE',
        payload: { positionX, positionY },
        meta: { charId, key }
      });
    });

    return () => document.removeEventListener('keydown');
  }, []);

  return (
    <>
      <button onClick={() => dispatch({
        type: 'REQUEST_LOCATION_CHANGE',
        meta: { locationId: 2 }
      })}>
        Change location to Novigrad
      </button>

    </>
  )
}

const TriggersWithStore = connect(
  (state) => ({ location: state.location }),
  (dispatch) => ({
    increment: () => dispatch({ type: 'INC' }),
    dispatch
  })
)(Triggers);

export { TriggersWithStore as Triggers };