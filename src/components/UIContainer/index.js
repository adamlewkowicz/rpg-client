import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import styled from 'styled-components';
import { QuestDialog } from '../Quest';
import selectors from '../../store/selectors';

import { Tooltip } from '../Tooltip';

const Container = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  /* z-index: -1; */
`

const UIContainer = ({ game, npcDialog, selectors }) => {
  const { focusedObject } = selectors;
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
  state => ({
    ...state,
    selectors: {
      focusedObject: selectors.focusedObject(state),
      optional: true
    }
  }),
  mapDispatchToProps,
)(UIContainer);

export { UIContainerWithStore as UIContainer };