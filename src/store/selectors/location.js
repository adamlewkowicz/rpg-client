import { createSelector } from 'reselect'

export const characterCords = (state) => ({
  x: state.character.data.positionX,
  y: state.character.data.positionY
});

export const characerPosition = createSelector(
  characterCords,
  ({ x, y }) => ({
    posX: x * 32,
    posY: y * 48
  })
);

export const locationMapEnds = (state) => ({
  mapEndX: state.location.width - state.game.width,
  mapEndY: state.location.height - state.game.height
});


export const locationMapPosition = createSelector(
  characerPosition,
  locationMapEnds,
  ({ posX, posY }, { mapEndX, mapEndY }) => {

    let isCameraLocked = false;
    let mapX = posX;
    let mapY = posY;

    if (posX <= 0) {
      mapX = 0;
      isCameraLocked = true;
    } else if (posX >= mapEndX) {
      mapX = mapEndX;
      isCameraLocked = true;
    }

    if (posY <= 0) {
      mapY = 0;
      isCameraLocked = true;
    } else if (posY >= mapEndY) {
      mapY = mapEndY;
      isCameraLocked = true;
    }

    return { mapX, mapY, isCameraLocked };
  }
);