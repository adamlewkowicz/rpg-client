import { createSelector } from 'reselect'

export const characterCords = (state) => ({
  x: state.character.data.positionX,
  y: state.character.data.positionY
});

export const gameWindowSize = (state) => ({
  width: state.game.width,
  height: state.game.height
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
  gameWindowSize,
  ({ posX, posY }, { mapEndX, mapEndY }, { width, height }) => {

    let isCameraLocked = false;
    let isXLocked = false;
    let isYLocked = false;

    const halfViewWidth = (width - 32 /* Char width */) / 2;
    const halfViewHeight = (height - 45) / 2;

    let mapX = posX - halfViewWidth;
    let mapY = posY - halfViewHeight;

    if (posX <= halfViewWidth) {
      mapX = 0;
      isXLocked = true;
    } else if (posX >= mapEndX) {
      mapX = mapEndX;
      isXLocked = true;
    }

    if (posY <= halfViewHeight) {
      mapY = 0;
      isYLocked = true;
    } else if (posY >= 2784) {
      mapY = 2488;
      isYLocked = true;
    }

    return { mapX, mapY, isCameraLocked, isXLocked, isYLocked };
  }
);