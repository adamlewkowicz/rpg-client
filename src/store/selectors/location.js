import { createSelector } from 'reselect'

export const charactersSelector = state => state.location.characters;
export const mobsSelector = state => state.location.mobs;
export const npcsSelector = state => state.location.npcs;
export const collisionsSelector = state => state.location.collisions;

export const mobsArray = createSelector(
  mobsSelector,
  mobs => Object.values(mobs)
);

export const aliveMobs = createSelector(
  mobsArray,
  mobs => mobs.filter(mob => mob.status !== 'DEAD')
);

export const npcsArray = createSelector(
  npcsSelector,
  npcs => Object.values(npcs)
);

export const characters = createSelector(
  charactersSelector,
  (characters) => Object.values(characters)
);

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
    const halfViewHeight = (height - 48) / 2;

    let mapX = posX - halfViewWidth;
    let mapY = posY - halfViewHeight;

    /* V2 */
    let charPosX = 256 /* Center */;
    let charPosY = 240 /* Center */;

    if (posX <= halfViewWidth) {
      mapX = 0;
      charPosX = posX - mapX;
      isXLocked = true;
    } else if (posX >= 2048 - halfViewWidth) {
      mapX = mapEndX;
      charPosX = posX - mapX;
      isXLocked = true;
    }

    if (posY <= 240) {
      mapY = 0;
      charPosY = posY - mapY;
      isYLocked = true;
    } else if (posY >= 3072 - halfViewHeight) {
      mapY = 3072 - 528;
      charPosY = posY - mapY;
      isYLocked = true;
    }

    return {
      mapX, mapY, isCameraLocked,
      isXLocked, isYLocked,
      charPosX, charPosY,
      halfViewWidth,
    };
  }
);

export const dynamicCollisions = createSelector(
  collisionsSelector,
  mobsArray,
  npcsArray,
  (collisions, mobs, npcs) => {
    const collisionsCopy = collisions.map(xRow =>
      xRow.map(point => !!point ? { type: 'TERRAIN' } : null)
    );
    
    for (let mob of mobs) {
      collisionsCopy[mob.x][mob.y] = {
        type: 'MOB',
        id: mob.id,
        data: mob
      }
    }

    for (let npc of npcs) {
      collisionsCopy[npc.x][npc.y] = {
        type: 'NPC',
        id: npc.id,
        data: npc
      }
    }

    return collisionsCopy;
  }
);

export const naiveDynamicCollisions = createSelector(
  dynamicCollisions,
  dynamicCollisions => dynamicCollisions.map(xRow => 
    xRow.map(point => ~~(!!point)) 
  )
);

export const locationObjects = createSelector(
  dynamicCollisions,
  npcsArray,
  aliveMobs,
  characters,
  (collisions, npcs, mobs, characters) => {
    const locationObjects = collisions.map(xRow =>
      xRow.map(point => !!point ? { type: 'TERRAIN' } : null)
    );

    for (let npc of npcs) {
      locationObjects[npc.x][npc.y] = {
        type: 'NPC',
        id: npc.id,
        data: npc
      }
    }

    for (let mob of mobs) {
      locationObjects[mob.x][mob.y] = {
        type: 'MOB',
        id: mob.id,
        data: mob
      }
    }

    for (let character of characters) {
      const { positionX: x, positionY: y } = character;
      locationObjects[x][y] = {
        type: 'CHARACTER',
        id: character.id,
        data: character
      }
    }

    return locationObjects;
  }
);

export const naiveCollisions = createSelector(
  locationObjects,
  locationObjects => locationObjects.map(xRow => 
    xRow.map(point => point != null
      ? ~~(point.type === 'CHARACTER')
      : 0
    )
  )
);