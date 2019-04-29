import React, { useContext, useEffect } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Shape, Group, Image } from 'react-konva'; 
import { connect, ReactReduxContext } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import { useSpring, animated } from 'react-spring/konva';

const charWidth = 32;
const charHeight = 48;

const gameWidth = 512;
const gameHeight = 512;

const handleClip = (ctx) => {
  ctx.rect(
    0, 0,
    charWidth, charHeight
  );
}


const Character = ({
  data,
  x = 0, y = 0,
  ownChar = false
}) => {
  const [characterImg] = useImage(process.env[`REACT_APP_CHARACTER_IMG_${data.id}`]);
  const positionProps = useSpring({
    from: { x: 0, y: 0 },
    to: { x, y },
    config: { mass: 1, tension: 150, friction: 50 },
  });

  if (!ownChar) {
    return  (
      <animated.Group
        x={positionProps.x.interpolate(v => v * charWidth)}
        y={y * charHeight}
        clipFunc={handleClip}
      >
        <Image image={characterImg} />
      </animated.Group>
    )
  }

  return (
    <Group
      x={gameWidth / 2 - charWidth / 2}
      y={gameHeight / 2 - charHeight / 2}
      clipFunc={handleClip}
    >
      <Image image={characterImg} />
    </Group>
  )
}

export { Character as Character };