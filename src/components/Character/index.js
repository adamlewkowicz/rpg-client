import React, { useContext, useEffect } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Shape, Group, Image } from 'react-konva'; 
import { connect, ReactReduxContext } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';

function useStore () {
  const { store } = useContext(ReactReduxContext);
  return store.getState();
}

const Character = () => {
  const [characterImg] = useImage(process.env.REACT_APP_CHARACTER_IMG);
  const state = useStore();
  const { game } = state;
  const charWidth = 32;
  const charHeight = 48;

  const handleClip = (ctx) => {
    ctx.rect(
      0, 0,
      charWidth, charHeight
    );
  }

  return (
    <Group
      x={game.width / 2 - charWidth / 2}
      y={game.height / 2 - charHeight / 2}
      clipFunc={handleClip}
    >
      <Image
        image={characterImg}
        // clipFunc={handleClip}
        // cropWidth={48}
      />
    </Group>
  )
}

export { Character as Character };