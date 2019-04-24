import React from 'react';
import { connect } from 'react-redux';


const Triggers = ({ dispatch }) => {


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