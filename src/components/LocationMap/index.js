import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
import { store } from '../../store/index';
import { useMappedState } from 'redux-react-hook';
import { useSpring, animated } from 'react-spring/konva';


export const LocationMap = ({ character, game, location }) => {
  const [locationImg] = useImage(process.env.REACT_APP_LOCATION_IMG);
  // const {  } = useMappedState(state => state);

  const mapX = character.data.positionX * game.charWidth * -1;
  const mapY = character.data.positionY * game.charHeight * -1;

  const positionProps = useSpring({
    from: { mapX: 0, mapY: 0 },
    to: { mapX, mapY },
    config: { mass: 1, tension: 150, friction: 50 }
  });

  const cameraShouldFollow = () => {
    /* X axis */
    const { positionX: x, positionY: y } = character.data;

    const charMapPosX = x * game.charWidth;
    const charMapPosY = y * game.charHeight;

    const mapEndLeftX = game.width / 2;
    const mapEndRightX = location.width - game.width;

    const mapEndTopY = game.height / 2;
    const mapEndBottomY = location.height - game.height;

    let mapX = charMapPosX;
    let mapY = charMapPosY;

  
    if (mapX <= 0) {
      mapX = 0;
    } else if (charMapPosX >= mapEndRightX) {
      mapX = mapEndRightX;
    }

    if (mapY  <= 0) {
      mapY = 0;
    } else if (mapY >= mapEndBottomY) {
      mapY = mapEndBottomY;
    }

    return { x: mapX, y: mapY };
  }
  
  console.log(cameraShouldFollow())
  const { x, y } = cameraShouldFollow();

  return (
    <animated.Image
      image={locationImg}
      x={x * -1}
      y={y * -1}
    />
  )
}