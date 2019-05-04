import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import styled from 'styled-components';
import { QuestDialog } from '../Quest';

const Container = styled.div`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  /* z-index: -1; */
`

const UIContainer = ({ game, npc: npcDialog }) => {
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
    </Container>
  );
}

const UIContainerWithStore = connect(
  state => state,
  mapDispatchToProps,
)(UIContainer);

export { UIContainerWithStore as UIContainer };