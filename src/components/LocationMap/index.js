import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from '../../store/index';
import { useMappedState } from 'redux-react-hook';


export const LocationMap = () => {
  const [locationImg] = useImage(process.env.REACT_APP_LOCATION_IMG);
  const { character, game } = useMappedState(state => state);

  if (game.status === 'LOADING') return null;

  const mapX = character.data.positionX * game.charWidth * -1;
  const mapY = character.data.positionY * game.charHeight * -1;

  return (
    <Image
      image={locationImg}
      x={mapX}
      y={mapY}
    />
  )
}