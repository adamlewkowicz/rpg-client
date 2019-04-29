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

const GameRenderer = () => {
  const state = useMappedState(state => state);

  if (state.game.status === 'LOADING') {
    return null;
  }
  
  const { charWidth, charHeight } = state.game;
  const characters = Object.values(state.location.characters);

  return (
    <>
      <Layer>
        <LocationMap {...state} />
      </Layer>
      <Layer>
        <Character
          data={state.character.data}
          game={state.game}
          x={state.character.positionX}
          y={state.character.positionY}
          ownChar
        />
        {characters.map(character => (
          <Character
            key={character.id}
            x={character.positionX}
            y={character.positionY}
            data={character}
            game={state.game}
          />
        ))}
      </Layer>
    </>
  )
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
            <GameRenderer />
          </StoreContext.Provider>
        </Stage>
      )}
    </StoreContext.Consumer>

  );
}