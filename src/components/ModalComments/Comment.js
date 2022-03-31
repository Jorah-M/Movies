import React from 'react';
import styled from 'styled-components';
import defaultUserImage from '../../assets/images/defaultUserImage.png';
import { textColors, backgroundColors } from '../../constants/defaultStyles';

const CommentContainer = styled.div`
  padding: 1rem 2rem 0.5rem 1rem;
`;

const Comment = styled.div`
  display: flex;
  > img {
    height: 64px;
    width: 64px;
    margin-right: 0.5em;
    margin-top: auto;
    margin-bottom: auto;
  }
  > div {
    color: ${textColors.white};
    background-color: ${backgroundColors.blue};
    font-size: 1.2rem;
    padding: 1.2rem;
    border-radius: 5px;
  }
`;

const CommentRow = ({ comment }) => (
  <CommentContainer>
    <Comment>
      <img src={defaultUserImage} title="user image" />
      <div>{comment}</div>
    </Comment>
  </CommentContainer>
);

export default CommentRow;
