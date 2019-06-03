import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import styled from 'styled-components';
import { QuestDialog } from '../Quest';
import * as selectors from '../../store/selectors';
import { AppState } from '../../store';
import { GameState, NpcDialogState } from 'rpg-shared/lib/store';

import { Tooltip } from '../Tooltip';

export interface UIContainerProps {
  game: GameState
  npcDialog: NpcDialogState
  focusedObject: ReturnType<typeof selectors.focusedObject>
}

interface ContainerProps {
  width: number
  height: number
}
const Container = styled.div<ContainerProps>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

const UIContainer = ({ game, npcDialog, focusedObject }: UIContainerProps) => {
  return (
    <Container
      width={game.width}
      height={game.height}
    >
      {npcDialog.opened && !npcDialog.isLoading && (
        <QuestDialog
          title={npcDialog.data.steps[npcDialog.step].text} 
          options={npcDialog.data.steps[npcDialog.step].options} 
        />
      )}
      {focusedObject && (
        <Tooltip
          x={focusedObject.data.x}
          y={focusedObject.data.y}
          title={focusedObject.data.name}
        />
      )}
    </Container>
  );
}

const UIContainerWithStore = connect(
  (state: AppState) => ({
    ...state,
    focusedObject: selectors.focusedObject(state)
  }),
  mapDispatchToProps,
)(UIContainer);

export { UIContainerWithStore as UIContainer };