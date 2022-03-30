import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';
import _debounce from 'lodash/debounce';
import fetchUrl from '../../utils/node-fetch';
import { filterUnique } from '../../utils/functions';
import { textColors, backgroundColors, lineColor } from '../../constants/defaultStyles';
import MovieRow from './MovieRow';
import sadPepe from './sadPepe.png';
import Button from "../Buttons/Button";
import {MOVIE_COMMENTS_MODAL} from "../../constants/modals";

const TableContainer = styled.div`
  box-shadow: rgb(226 226 226) 0 0.142rem 0.571rem;
  margin: 2em;
  @media only screen and (max-width: 768px) {
    margin: 0;
  }
`;

const TableHeader = styled.div`
  display: flex;
  text-align: left;
  border-bottom: 1px solid ${lineColor};
  > div {
    width: 11.75%;
    padding: 1.5em 0 1.5em 1.5em;
  }
  > div:first-child {
    width: 28%;
  }
  > div:last-child {
    width: 25%;
    padding-right: 1.5em;
  }
`;

const TableSubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  border-bottom: 1px solid ${lineColor};
`;

const TableSearch = styled.div`
  width: 22%;
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
  }
  
  > input:focus::placeholder {
    color: transparent;
  }
`;

const TableSort = styled.div`
  user-select: none;
  > select {
    font-family: 'Open Sans', sans-serif;
    appearance: none;
    display: inline-block;
    background-image: url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234D4D4D%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E);
    background-repeat: no-repeat;
    background-position: right 1em top 50%, 0 0;
    background-size: 0.5em auto, 100%;
    cursor: pointer;
    word-wrap: break-word;
    transform: rotateZ(0);
    width: 15em;
    min-height: 2.71428571em;
    padding: 0.71571429em 2.5em 0.71571429em 1em;
    box-shadow: none;
    border: 1px solid ${lineColor};
    transition: border-color 0.2s ease;
    border-radius: 0.2em;
    outline: none;
    &:hover {
      border-color: rgba(34,36,38,.35);
    }
    &::-ms-expand {
      display: none;
    }
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  > div:nth-child(odd) {
   background-color: ${backgroundColors.lightGray};
  }
`;

const TableError = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${backgroundColors.white} !important;
  margin: 10em;
  > div:first-child {
    font-size: 1.3em;
    margin-right: 0.5em;
  }
  > div:last-child {
    margin: 1em auto;
  }
`;

const TableLoading = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${backgroundColors.white} !important;
  margin: 10em;
  > div:first-child {
    font-size: 1.5em;
    margin-right: 0.5em;
  }
  > div:last-child {
    margin-top: 0.2em;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NoMovies = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: ${backgroundColors.white} !important;
  margin: 3em;
  > div:first-child {
    width: 250px;
    height: 200px;
    background-image: url(${sadPepe});
    background-size: cover;
    border-radius: 50px;
    margin: auto;
  }
  > div:last-child {
    font-size: 1.3em;
    margin-top: 1em;
  }
`;

const MoviesTable = () => {
  const [moviesList, setMoviesList] = useState(null);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);
  const [chosenGenre, setChosenGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const moviesToShow = useRef([]);

  moviesToShow.current = filteredMovies || moviesList;

  useEffect(() => {
    fetchUrl().then((data) => setMoviesList(data)).catch((err) => setError(err))
  }, []);

  console.log('error', error)


  useEffect(() => {
    let filteredMovies = null;
    if (error) {
      return;
    } else if (!searchQuery && chosenGenre) {
      filteredMovies = moviesList
        .filter((movie) => movie.genre.includes(chosenGenre));
    } else if (searchQuery && !chosenGenre) {
      filteredMovies = moviesList
        .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (searchQuery && chosenGenre) {
      filteredMovies = moviesList
        .filter((movie) => movie.genre.includes(chosenGenre))
        .filter((movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setFilteredMovies(filteredMovies);
  }, [searchQuery, chosenGenre]);

  const handleDebounceFn = (value) => {
    setSearchQuery(value);
  };
  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
  const handleChange = (event) => {
    debounceFn(event.target.value);
  };

  console.log('searchQuery = ', searchQuery)
  console.log('moviesToShow.current', moviesToShow.current)

  const filterByGenre = (genre) => {
    if (genre === 'All') {
      setChosenGenre(null);
      return;
    }
    setChosenGenre(genre);
  }

  const genres = moviesList?.map((movie) => movie.genre).flat();
  const uniqueGenres = (genres && filterUnique(genres).sort()) || [];

  return (
    <TableContainer>
      <TableHeader>
        <div>Title</div>
        <div>Year</div>
        <div>Runtime</div>
        <div>Revenue</div>
        <div>Rating</div>
        <div>Genres</div>
      </TableHeader>
      <TableSubHeader>
        <TableSearch>
          <input
            type="search"
            placeholder={'Filter by title'}
            autoComplete="off"
            onChange={handleChange}
          />
        </TableSearch>
        <TableSort>
          <select onChange={(e) => filterByGenre(e.target.value)}>
            <option key={'All'} value={'All'}>All</option>
            {uniqueGenres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </TableSort>
      </TableSubHeader>
      <TableBody>
        {error && (
          <TableError>
            <div>Oups! Something went wrong... Try to refresh the page.</div>
            <div>
              <Button
                content={'Refresh'}
                onClickButton={() => {
                  window.location.reload();
                }}
              >
                Обновить
              </Button>
            </div>
          </TableError>
        )}
        {!error && moviesToShow.current === null && (
          <TableLoading>
            <div>Loading movies, please wait...</div>
            <div/>
          </TableLoading>
        )}
        {moviesToShow.current?.length === 0 && (
          <NoMovies>
            <div />
            <div>No movies found. Try another filters.</div>
          </NoMovies>
        )}
        {moviesToShow.current?.map((movieData) => (
          <MovieRow
            key={movieData.rank}
            movieData={movieData}
          />
        ))}
      </TableBody>
      <div style={{ zIndex: '1' }} id={MOVIE_COMMENTS_MODAL} />
    </TableContainer>
  );
};

export default MoviesTable;