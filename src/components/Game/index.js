import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from '../../store/index';

import { Character } from '../Character';

export const Game = () => {
  const store = useContext(ReactReduxContext);
  const [locationImg] = useImage(process.env.REACT_APP_LOCATION_IMG);
  

  return (
  <Stage
    width={512}
    height={512}
  >
    <ReactReduxContext.Provider value={store}>
      <Layer>
        <Image image={locationImg} />
      </Layer>
      <Layer>
        <Character />
      </Layer>
    </ReactReduxContext.Provider>
  </Stage>
  );
}