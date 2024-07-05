const express = require('express');
const axios = require('axios');
const router = express.Router();

const OMDB_API_KEY = process.env.OMDB_API_KEY;

const fetchMovieDetails = async (id) => {
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);
  return response.data;
};

router.get('/search', async (req, res) => {
  const query = req.query.query;
  try {
    const moviesResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`);
    const seriesResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=series`);

    const movies = moviesResponse.data.Search || [];
    const series = seriesResponse.data.Search || [];

    const combinedResults = [...movies, ...series];

    const results = await Promise.all(combinedResults.map(async (item) => {
      const details = await fetchMovieDetails(item.imdbID);
      return {
        ...item,
        imdbRating: details.imdbRating,
      };
    }));

    // Fallback to a default search if no results found
    if (results.length === 0) {
      const defaultResponse = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=popular&type=movie`);
      const defaultResults = defaultResponse.data.Search || [];
      res.json(defaultResults);
    } else {
      res.json(results);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from OMDB' });
  }
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);
    const movie = response.data;

    const movieDetails = {
      Title: movie.Title,
      Year: movie.Year,
      Rated: movie.Rated,
      Released: movie.Released,
      Runtime: movie.Runtime,
      Genre: movie.Genre,
      Director: movie.Director,
      Writer: movie.Writer,
      Actors: movie.Actors,
      Plot: movie.Plot,
      Language: movie.Language,
      Country: movie.Country,
      Awards: movie.Awards,
      Poster: movie.Poster,
      Ratings: movie.Ratings,
      Metascore: movie.Metascore,
      imdbRating: movie.imdbRating,
      imdbVotes: movie.imdbVotes,
      imdbID: movie.imdbID,
      Type: movie.Type,
      DVD: movie.DVD,
      BoxOffice: movie.BoxOffice,
      Production: movie.Production,
      Website: movie.Website,
      Response: movie.Response,
    };

    res.json(movieDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie details from OMDB' });
  }
});

module.exports = router;
