import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
// import { store } from '../../store/index';
import { StoreContext, useMappedState } from 'redux-react-hook';

import { Character } from '../Character';
import { LocationMap } from '../LocationMap';

const Loading = ({ store, children }) => {
  const status = useMappedState(state => state.game.status);

  if (status === 'LOADING') {
    return null;
  }
  return children;
}

export const Game = () => {
  const store = useContext(StoreContext);

  return (
    <StoreContext.Consumer>
      {store => (
        <Stage
          width={512}
          height={512}
        > 
          <StoreContext.Provider value={store}>
            <Loading>
              <Layer>
                <LocationMap />
              </Layer>
              <Layer>
                <Character />
              </Layer>
            </Loading>
          </StoreContext.Provider>
        </Stage>
      )}
    </StoreContext.Consumer>

  );
}