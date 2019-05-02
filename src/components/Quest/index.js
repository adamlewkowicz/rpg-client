import React from 'react';
import styled from 'styled-components';


const Option = styled.li`
  color: #F3A83D;
  background: #1A1E21;
  padding: 5px 0;
  border-top: 1px solid #CFB5A5;
  border-bottom: 1px solid #CFB5A5;
`;

export const DialogOption = ({ text }) => (
  <Option>
    {text}
  </Option>
)

const Container = styled.div`

`

const OptionsList = styled.ul`

`


export const QuestDialog = ({ text, options }) => {

  return (
    <Container>
      <OptionsList>
        {options.map(option => (
          <DialogOption  
            key={option.id}
            {...option}
          />
        ))}
      </OptionsList>
    </Container>
  )
}