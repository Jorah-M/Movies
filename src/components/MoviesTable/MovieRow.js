import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { textColors, backgroundColors, lineColor } from '../../constants/defaultStyles';

const MovieContainer = styled.div`
  font-weight: 500;
  display: flex;
  text-align: left;
  border-bottom: 1px solid ${lineColor};
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
  // console.log(movieData)
  // actors: (4) ['David Oyelowo', 'Carmen Ejogo', 'Tim Roth', 'Lorraine Toussaint']
  // description: "A chronicle of Martin Luther King's campaign to secure equal voting rights via an epic march from Selma to Montgomery, Alabama in 1965."
  // director: "Ava DuVernay"
  // genre: (3) ['Biography', 'Drama', 'History']
  // metascore: ""
  // rank: "990"
  // rating: "7.5"
  // revenue: "52.07"
  // runtime: "128"
  // title: "Selma"
  // votes: "67637"
  // year: "2014"
  const {
    rating, revenue, runtime, title, genre, year,
  } = movieData;

  const toHoursAndMinutes = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours.toString()}h ${minutes.toString()}m`;
  }

  return (
    <MovieContainer>
      <div>{title}</div>
      <div>{year}</div>
      <div>{toHoursAndMinutes(runtime)}</div>
      <div>{`$${revenue} M`}</div>
      <div>{rating}</div>
      <div>{genre.join(', ')}</div>
    </MovieContainer>
  )
}

export default MovieRow;