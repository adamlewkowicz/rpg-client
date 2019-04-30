import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from '../../store/index';
import { useMappedState } from 'redux-react-hook';
import { useSpring, animated } from 'react-spring/konva';
import { locationMapPosition } from '../../store/selectors/location';


export const LocationMap = ({ character, game, location }) => {
  const [locationImg] = useImage(process.env.REACT_APP_LOCATION_IMG);
  const state = useMappedState(state => state);
  const mapPosition = locationMapPosition(state);

  const mapX = character.data.positionX * game.charWidth * -1;
  const mapY = character.data.positionY * game.charHeight * -1;

  const positionProps = useSpring({
    from: { mapX: 0, mapY: 0 },
    to: { mapX, mapY },
    config: { mass: 1, tension: 150, friction: 50 }
  });

  return (
    <animated.Image
      image={locationImg}
      x={mapPosition.mapX * -1}
      y={mapPosition.mapY * -1}
    />
  )
}