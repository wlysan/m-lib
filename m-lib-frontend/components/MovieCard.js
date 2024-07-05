import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/MovieCard.module.css';

const MovieCard = ({ movie, onDelete, onRate, isUserList }) => {
  const [rating, setRating] = useState(movie.userRating || '');

  useEffect(() => {
    setRating(movie.userRating || '');
  }, [movie.userRating]);

  const handleDelete = async () => {
    console.log('Deleting movie:', movie); // Debugging line
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/lists/${movie.listId}/${movie.movieID}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(movie.localId);
    } catch (error) {
      console.error('Error deleting movie from list:', error);
    }
  };

  const handleRate = async () => {    
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        'http://localhost:3000/lists/update-rating',
        { listId: movie.listId, movieId: movie.movieID, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );      
      onRate(movie.localId, rating);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  return (
    <div className={styles.movieCard}>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <div>
        <a href={`/movie/${movie.imdbID}`}>Details</a>
      </div>
      {isUserList && (
        <>
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div className={styles.rateContainer}>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="10"
              placeholder="Rate"
            />
            <button onClick={handleRate}>Rate</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
