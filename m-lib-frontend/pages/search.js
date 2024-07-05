import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MovieCard from '../components/MovieCard'; 

const Search = () => {
  const router = useRouter();
  const { query } = router.query;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/omdb/search?query=${query}`
      );
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query);
    }
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">Results for: {query}</h2>
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
};

export default Search;
