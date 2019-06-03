import { createSelector, Selector } from 'reselect';
import { locationObjects } from './location';
import { AppState } from '../index';

export const mouseXSelector = (state: AppState) => state.game.mouseX;
export const mouseYSelector = (state: AppState) => state.game.mouseY;

export const focusedObject = createSelector(
  mouseXSelector,
  mouseYSelector,
  locationObjects,
  (mouseX, mouseY, locationObjects) => (locationObjects[mouseX][mouseY]) || null
);