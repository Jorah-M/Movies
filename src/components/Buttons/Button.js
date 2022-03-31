import React from 'react';
import styled from 'styled-components';
import { backgroundColors, shadowColor } from '../../constants/defaultStyles';

const StyledButton = styled.button`
  font-size: 1.2em;
  width: 8em;
  height: 2.5em;
  background-color: ${backgroundColors.lightGray2};
  cursor: pointer;
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 0.3em;
  vertical-align: baseline;
  font-family: 'Open Sans', 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  transition: background-color 200ms ease-in-out 0s, box-shadow 200ms ease-in-out 0s;

  &:hover {
    background-color: ${backgroundColors.lightGray3};
    background-image: none;
    box-shadow: ${shadowColor} 0 0.142rem 0.571rem;
  }
`;

const Button = ({ content, onClickButton }) => (
  <StyledButton onClick={onClickButton}>
    {content}
  </StyledButton>
);

export default Button;
