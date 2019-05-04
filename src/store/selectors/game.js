import { createSelector } from 'reselect';
import { locationObjects } from './location';

export const mouseXSelector = state => state.game.mouseX;
export const mouseYSelector = state => state.game.mouseY;

export const focusedObject = createSelector(
  mouseXSelector,
  mouseYSelector,
  locationObjects,
  (mouseX, mouseY, locationObjects) => {
    const foundObject = (locationObjects[mouseX] && locationObjects[mouseX][mouseY]);
    return foundObject && foundObject.type !== ' TERRAIN'
      ? foundObject
      : null
  }
);