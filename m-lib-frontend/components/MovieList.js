import React from 'react';
import MovieCard from './MovieCard';
import styles from '../styles/MovieCard.module.css';

const MovieList = ({ movies, onRate }) => {
  return (
    <div className={styles.moviesContainer}>
      {movies.map((movie) => (
        <MovieCard key={movie.imdbId} movie={movie} onRate={onRate} />
      ))}
    </div>
  );
};

export default MovieList;
