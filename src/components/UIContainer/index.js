import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../../store/mappers';
import styled from 'styled-components';
import { QuestDialog } from '../Quest';

const Container = styled.div`
  position: absolute;
`

const UIContainer = ({ game }) => {
  return (
    <Container>
      {game.questDialogOpened && (
        <QuestDialog
          title={'HI!'} 
          options={[]} 
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