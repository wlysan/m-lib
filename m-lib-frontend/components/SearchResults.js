import { FaStar } from 'react-icons/fa';
import styles from '../styles/MovieCard.module.css';

const SearchResults = ({ results, onAddMovie }) => {
  return (
    <div className={styles.moviesContainer}>
      {results.map((result) => (
        <div className={styles.movieCard} key={result.imdbID}>
          <img src={result.Poster !== "N/A" ? result.Poster : "/placeholder.jpg"} alt={result.Title} />
          <h2>{result.Title}</h2>
          <p>
            <FaStar /> {result.imdbRating}
          </p>
          <button onClick={() => onAddMovie(result.imdbID)}>Add to List</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
