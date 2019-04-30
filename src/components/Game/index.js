import React, { useContext } from 'react';
import useImage from 'use-image';
import { Stage, Layer, Image, Text, TextPath } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';
// import { store } from '../../store/index';
import { StoreContext, useMappedState } from 'redux-react-hook';
import {
  locationMapPosition,
  characerPosition,
  characterCords
} from '../../store/selectors/location';

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
  
  const { posX, posY } = characerPosition(state);
  const { x, y } = characterCords(state);
  const { mapX, mapY, isCameraLocked } = locationMapPosition(state);
  const { charWidth, charHeight } = state.game;
  const characters = Object.values(state.location.characters);

  return (
    <>
      <Layer>
        <LocationMap
          mapX={mapX}
          mapY={mapY}
          {...state}
        />
      </Layer>
      <Layer>
        <Text
          text={`${x} - ${y}`}
          fill="#fff"
          fontSize={16}
          fontStyle="bold"
        />
        <Text
          text={`${posX} - ${posY}`}
          fill="#fff"
          fontSize={16}
          fontStyle="bold"
          y={30}
        />
        <Text
          x={100}
          fontSize={14}
          fontStyle="bold"
          text={'ID: ' + state.character.data.id}
          fill="#fff"
        />
        <Character
          data={state.character.data}
          game={state.game}
          x={state.character.positionX}
          y={state.character.positionY}
          isCameraLocked={isCameraLocked}
          ownChar
        />
        {characters.map(character => (
          <Character
            key={character.id}
            x={character.positionX}
            y={character.positionY}
            data={character}
            game={state.game}
            isCameraLocked={isCameraLocked}
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