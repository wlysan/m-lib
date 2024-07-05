const axios = require('axios');
require('dotenv').config();

exports.getMovieByImdbId = async (imdbId) => {
  const response = await axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`);
  return response.data;
};
