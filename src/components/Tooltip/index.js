import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transform: translateX(-20%);
  font-size: 12px;
  padding: 3px 6px;
  background: rgb(35,43,56);
  background: linear-gradient(90deg, rgba(35,43,56,1) -19%, rgba(35,43,56,0.65) 0%, rgba(35,43,56,1) 50%, rgba(35,43,56,0.65) 100%);
  border: 1px solid #CFB5A5;
  box-shadow: 0 0 1px 0 rgb(35,43,56);
  z-index: 11;
`

export const Tooltip = ({ x = 0, y = 0, title }) => {
  return (
    <Container
      left={x * 32}
      top={y * 48 - 48 / 2 - 5}
    >
      {title}
    </Container>
  )
}