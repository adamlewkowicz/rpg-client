import React from 'react';
import { connect } from 'react-redux';


const Triggers = (props) => {


  return (
    <>
      <button onClick={() => dispatch({ type: 'CHANGE_LOCATION' })}>
        Trigger
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