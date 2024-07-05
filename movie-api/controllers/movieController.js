const Movie = require('../models/movie');
const omdbService = require('../services/omdbService');

exports.addMovie = async (req, res) => {
  try {
    const { imdbId } = req.body;
    const movieData = await omdbService.getMovieByImdbId(imdbId);
    const movie = await Movie.create({
      title: movieData.Title,
      imdbId: movieData.imdbID,
      userId: req.user.id,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.rateMovie = async (req, res) => {
  try {
    const { id, rating } = req.body;
    const movie = await Movie.findOne({ where: { id, userId: req.user.id } });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    movie.rating = rating;
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
