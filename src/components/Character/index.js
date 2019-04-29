import React, { useContext, useEffect } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image } from 'react-konva'; 
import { connect, ReactReduxContext } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';

function useStore () {
  const { store } = useContext(ReactReduxContext);
  return store.getState();
}

const Character = () => {
  const [characterImg] = useImage(process.env.REACT_APP_CHARACTER_IMG);
  const state = useStore();

  return (
    <Image
      image={characterImg}
      width={48}
      pixelRatio={1}
    />
  )
}

export { Character as Character };