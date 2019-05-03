import React from 'react';
import { connect } from 'react-redux';

const Loading = ({ status, charLoaded, children }) => (
  status == 'LOADING' && charLoaded
  ? (<div>Loading...</div>)
  : children
);

const LoadingWithStore = connect(
  state => ({
    status: state.game.status,
    charLoaded: state.character.data && state.character.data.id != null
  })
)(Loading);

export { LoadingWithStore as Loading };