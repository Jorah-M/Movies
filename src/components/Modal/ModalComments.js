import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { textColors, backgroundColors, shadowColorDark, lineColor } from '../../constants/defaultStyles';
import arrow from '../../assets/icons/arrow.svg';

const Container = styled.div`
  text-align: left;
  background: rgba(0,0,0,0.8);
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-y: scroll;
`;

const Content = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  width: 700px;
  margin-left: -330px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-bottom: 3em;
  box-shadow: ${shadowColorDark} 0 0.142rem 0.571rem;
`;

const Header = styled.div`
  display: flex;
  background-color: ${backgroundColors.blue};
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  > div:first-child {
    padding: 1.5rem 1.2rem;
    > div {
      background: url(${arrow}) no-repeat;
      display: inline-block;
      transform: rotate(180deg);
      background-size: 1.2857rem;
      width: 1.2857rem;
      height: 1.2857rem;
      vertical-align: middle;
    }
  }
  > div:last-child {
    padding: 1.5rem 1.2rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: ${textColors.white}
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 600px;
  background-color: ${backgroundColors.lightGray};
`;

const Footer = styled.div`
  display: flex;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  > input {
    border: 1px solid ${lineColor};
    font-size: 0.875em;
    height: 2.57em;
    z-index: 202;
    position: relative;
    appearance: none;
    outline: none;
    background-clip: padding-box;
    line-height: 1.5;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 1em;
    width: 100%;
    transition: border-color 0.2s ease;
    &:hover {
      border-color: rgba(34,36,38,.35);
    }
    &::-ms-clear, &::-ms-reveal {
      display: none;
      width : 0;
      height: 0;
    }
    &::-webkit-search-cancel-button {
      display: none;
    }
`;

const ModalComments = React.forwardRef(({ data, onClose }, ref) => {
  const { title } = data;

  return (
    <Container>
      <Content ref={ref}>
        <Header>
          <div
            id="arrowBack"
            onClick={onClose}
          >
            <div/>
          </div>
          <div>
            {title}
          </div>
        </Header>
        <Body>

        </Body>
        <Footer>
          <input />
        </Footer>
      </Content>
    </Container>
  );
});

export default ModalComments;