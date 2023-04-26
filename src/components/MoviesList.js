import React from 'react';
import Loading from './Loading';
import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {

  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        /> 
      ))}
      {props.Loading && <Loading></Loading>}
    </ul>
  );
};

export default MovieList;
