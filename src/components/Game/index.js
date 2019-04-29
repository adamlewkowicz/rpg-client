import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
// import { store } from '../../store/index';
import { StoreContext } from 'redux-react-hook'

import { Character } from '../Character';
import { LocationMap } from '../LocationMap';

export const Game = () => {
  const store = useContext(StoreContext);

  return (
    <StoreContext.Consumer>
      {ww => (
        <Stage
          width={512}
          height={512}
        >
          <StoreContext.Provider value={store}>
            <Layer>
              <LocationMap />
            </Layer>
            <Layer>
              <Character />
            </Layer>
          </StoreContext.Provider>
        </Stage>
      )}
    </StoreContext.Consumer>

  );
}