const axios = require('axios');

exports.searchMovies = async (req, res) => {
  const query = req.query.query || 'top';
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
    const movies = response.data.Search;
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
};

exports.getMovieByImdbId = async (imdbId) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie from OMDB:', error);
      return null;
    }
  };