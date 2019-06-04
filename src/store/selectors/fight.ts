import { AppState } from '../index';
import { createSelector } from 'reselect';
import { mobsArray, charactersArray, characters } from './location';

const fightActions = (state: AppState) => state.fight.actions;
const fightTargets = (state: AppState) => state.fight.targets;