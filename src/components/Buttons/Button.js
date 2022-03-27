import React from 'react';
import styled from 'styled-components';
import { backgroundColors } from '../../constants/defaultStyles';

const StyledButton = styled.button`
  font-size: 1.2em;
  width: 8em;
  height: 2.5em;
  background-color: #e0dede;
  cursor: pointer;
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 0.3em;
  vertical-align: baseline;
  font-family: 'Open Sans', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  transition: background-color 200ms ease-in-out 0s, box-shadow 200ms ease-in-out 0s;

  &:hover {
    background-color: #d6d4d4;
    background-image: none;
    box-shadow: rgb(226 226 226) 0 0.142rem 0.571rem;
  }
`;

const Button = ({ content, onClickButton }) => {

  return (
    <StyledButton onClick={onClickButton}>
      {content}
    </StyledButton>
  )
}

export default Button;