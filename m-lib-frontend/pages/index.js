import axios from 'axios';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoviesAndSeries = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/omdb/search?query=${query}`
      );
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies and series:', error);
      setError('Failed to fetch movies and series');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesAndSeries('best');
  }, []);

  return (
    <div className="container">
      <h2 className="title">Best Films and Series</h2>
      <div className="movies-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {movies.length === 0 && !loading && <p>No results found.</p>}
        {movies.length > 0 && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
