import React from 'react';
import styled from 'styled-components';

const Option = styled.li`
  color: #F3A83D;
  background: #1A1E21;
  padding: 11px 0;
  border-bottom: 1px solid #CFB5A5;
  &:first-child {
    border-top: 1px solid #CFB5A5;
  }
  &:hover span {
    transform: translateY(-2px);
    text-decoration: underline;
    cursor: pointer;
  }
`
const OptionText = styled.span`
  transition: transform .25s ease;
  display: block;
`

export const DialogOption = ({ text }) => (
  <Option>
    <OptionText>
      {text}
    </OptionText>
  </Option>
)

const Container = styled.div`
  bottom: 10px;
  z-index: 10 !important;
  position: absolute;
  width: 100%;
`
const Title = styled.p`
  padding: 10px 20px;
  background: rgb(35,43,56);
  background: linear-gradient(90deg, rgba(35,43,56,1) -19%, rgba(35,43,56,0.65) 0%, rgba(35,43,56,1) 50%, rgba(35,43,56,0.65) 100%);
  margin: 0 0 10px 0;
`
const OptionsList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`


export const QuestDialog = ({ title, options }) => {
  return (
    <Container>
      <Title>{title}</Title>
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