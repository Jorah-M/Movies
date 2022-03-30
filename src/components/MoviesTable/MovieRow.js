import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { textColors, backgroundColors, lineColor } from '../../constants/defaultStyles';
import {MOVIE_COMMENTS_MODAL} from "../../constants/modals";
import ModalComments from "../ModalComments/ModalComments";

const MovieContainer = styled.div`
  cursor: pointer;
  font-weight: 500;
  display: flex;
  text-align: left;
  border-bottom: 1px solid ${lineColor};
  transition: background-color 50ms ease-in-out 0s, box-shadow 50ms ease-in-out 0s;
  &:nth-child(odd):hover {
    box-shadow: rgb(226 226 226) 0 2px 15px 0;
    z-index: 2;
  }
  &:nth-child(even):hover {
    box-shadow: rgb(220 220 220) 0 2px 15px 0;
    z-index: 2;
  }
  
  > div {
    width: 11.75%;
    padding: 1.5em 0 1.5em 1.5em;
    margin: auto 0;
  }
  > div:first-child {
    width: 28%;
  }
  > div:last-child {
    width: 25%;
    padding-right: 1.5em;
  }
`;

const MovieRow = ({ movieData }) => {
  const {
    rating, revenue, runtime, title, genre, year,
  } = movieData;

  const [isShowModal, setShowModal] = useState(false);
  const modalRef = React.createRef();

  const onClickMovie = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
    console.log('CLOSING')
  }

  const toHoursAndMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours.toString()}h ${minutes.toString()}m`;
  };

  const getEventType = () => 'ontouchstart' in window ? 'touchstart' : 'click';

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        modalRef.current.contains(e.target)
        && (e.target.id !== 'arrowBack' && e.target.parentNode.id !== 'arrowBack')
      ) {
        return;
      }
      onCloseModal();
    }
    if (isShowModal) {
      document.addEventListener(getEventType(), handleOutsideClick, false);
      return () => {
        document.removeEventListener(getEventType(), handleOutsideClick, false);
      }
    }
  }, [isShowModal]);

  const modalElement = (
    <>
      { isShowModal && (
        <ModalComments data={movieData} onClose={onCloseModal} ref={modalRef}/>
      )}
    </>
  );

  const portalDOMElement = document.getElementById(MOVIE_COMMENTS_MODAL);
  const portalElement = ReactDOM.createPortal(modalElement, portalDOMElement);

  return (
    <MovieContainer
      onClick={onClickMovie}
    >
      <div>{title}</div>
      <div>{year}</div>
      <div>{toHoursAndMinutes(runtime)}</div>
      <div>{revenue ? `$${revenue} M` : 'Unknown'}</div>
      <div>{rating}</div>
      <div>{genre.join(', ')}</div>
      {portalElement}
    </MovieContainer>
  )
}

export default MovieRow;