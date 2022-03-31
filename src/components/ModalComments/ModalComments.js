import React, {
  useState, useEffect, useRef, forwardRef,
} from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import {
  textColors, backgroundColors, shadowColorDark, lineColor,
} from '../../constants/defaultStyles';
import arrow from '../../assets/icons/arrow.svg';
import plane from '../../assets/icons/plane.svg';
import firebase from '../../utils/firebase';
import Comment from './Comment';

const Container = styled.div`
  text-align: left;
  background: ${backgroundColors.modalBlackout};
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
  top: 3%;
  left: 50%;
  width: 70%;
  margin-left: -35%;
  background: ${backgroundColors.white};
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
    cursor: pointer;
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
  height: 70vh;
  background-color: ${backgroundColors.lightGray};
  overflow: scroll;
`;

const Footer = styled.div`
  display: flex;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  background: ${backgroundColors.white};
  > input {
    border: 1px solid ${lineColor};
    border-right: none;
    font-size: 1.1rem;
    z-index: 202;
    outline: none;
    background-clip: padding-box;
    line-height: 1.5;
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 1em;
    width: 100%;

    &::-ms-clear, &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }

    &::-webkit-search-cancel-button {
      display: none;
    }
  }
  > div {
    padding: 0.9rem;
    background-color: ${backgroundColors.blue};
    border-radius: 50%;
    margin: 0.35rem 0.75rem 0.35rem 0.35rem;
    cursor: pointer;
    > div {
      margin: auto;
      background: url(${plane}) no-repeat;
      display: inline-block;
      background-size: 1.8857rem;
      width: 1.8857rem;
      height: 1.8857rem;
      vertical-align: middle;
      transform: translate(-0.1rem);
    }
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  > div:first-child {
    font-size: 1.2em;
    margin-right: 0.5em;
    opacity: 0.6;
  }
  > div:last-child {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: spin 1s linear infinite;
  }
`;

const EmptyOrError = styled.div`
  margin: auto;
  font-size: 1.2rem;
  opacity: 0.6;
  text-align: center;
  user-select: none;
`;

const ModalComments = forwardRef(({ data, onClose }, ref) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);
  const { title, rank } = data;
  const firebaseRef = firebase.firestore().collection('movies');
  const chatInputRef = useRef(null);
  const commentsEndRef = useRef(null);

  const getMovies = () => {
    setLoading(true);
    firebaseRef.onSnapshot((querySnapshot) => {
      const moviesToSet = [];
      querySnapshot.forEach((doc) => {
        moviesToSet.push(doc.data());
      });
      setMovies(moviesToSet?.[0]);
      setLoading(false);
    });
  };

  /** Using rank as id here (and as a key in map) because it's unique.
   * In real case it's better add unique id for every movie.
   * Or we can combine id from movie data (such as title_year_rating etc.)
   */
  const addComment = () => {
    if (!comment) return;
    const id = uuidv4();
    const objectForAdding = Array.isArray(movies?.[rank])
      // eslint-disable-next-line no-unsafe-optional-chaining
      ? { ...movies, [rank]: [...movies?.[rank], { id, comment }] }
      : { ...movies, [rank]: [{ id, comment }] };
    firebaseRef
      .doc('moviesList')
      .set(objectForAdding)
      .catch((err) => setError(err));
    setComment('');
  };

  const dataToComments = (dataForFormatting) => {
    const newData = Object.values(dataForFormatting?.[rank]);
    return [...newData];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addComment();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    getMovies();
    chatInputRef.current.focus();
    window.document.getElementsByTagName('body')[0].classList.add('body-blocker');
    return () => {
      window.document.getElementsByTagName('body')[0].classList.remove('body-blocker');
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      commentsEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading, movies]);

  return (
    <Container>
      <Content ref={ref}>
        <Header>
          <div
            id="arrowBack"
            onClick={onClose}
          >
            <div />
          </div>
          <div>
            {title}
          </div>
        </Header>
        <Body>
          {error && (
            <EmptyOrError>Oops, an error has occurred!<br />Please, try again later.</EmptyOrError>
          )}
          {loading && (
            <Loading>
              <div>Loading comments, please wait...</div>
              <div />
            </Loading>
          )}
          {!loading
            && !movies?.[rank]
            && (
              <EmptyOrError>
                No comments yet.
                <br />
                Be the first one to leave a review!
              </EmptyOrError>
            )}
          {!loading
            && movies?.[rank]
            && dataToComments(movies).map(
              ({ id, comment: content }) => (
                <Comment key={id} comment={content} />
              ),
            )}
          <div ref={commentsEndRef} />
        </Body>
        <Footer>
          <input
            value={comment}
            placeholder="Leave your review!"
            onKeyUp={(e) => handleKeyPress(e)}
            onChange={(e) => setComment(e.target.value)}
            ref={chatInputRef}
          />
          <div
            onClick={addComment}
          >
            <div />
          </div>
        </Footer>
      </Content>
    </Container>
  );
});

export default ModalComments;
