const List = require('../models/list');
const Movie = require('../models/movie');
const ListMovie = require('../models/listMovie');
const omdbService = require('../services/omdbService');
const logger = require('../logger');

exports.createList = async (req, res) => {
  try {
    const { name } = req.body;
    const list = await List.create({ name, userId: req.user.id });
    logger.info(`User ${req.user.id} created a new list with id ${list.id}`);
    res.status(201).json(list);
  } catch (error) {
    logger.error(`Error creating list: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.addMovieToList = async (req, res) => {
  try {
    const { listId, imdbId } = req.body;
    const list = await List.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    const movieData = await omdbService.getMovieByImdbId(imdbId);
    if (!movieData) {
      return res.status(404).json({ error: 'Movie not found in OMDB' });
    }

    const [movie] = await Movie.findOrCreate({
      where: { imdbId },
      defaults: { title: movieData.Title, imdbId: movieData.imdbID, userId: req.user.id }
    });

    await ListMovie.create({ listId: list.id, movieId: movie.id });

    logger.info(`User ${req.user.id} added movie ${imdbId} to list ${listId}`);
    res.status(201).json({ message: 'Movie added to list' });
  } catch (error) {
    logger.error(`Error adding movie to list: ${error.message}`);
    res.status(400).json({ error: 'Failed to add movie to list' });
  }
};

exports.updateMovieRating = async (req, res) => {
  try {
    const { listId, movieId, rating } = req.body;
    const listMovie = await ListMovie.findOne({
      where: { listId, movieId },
    });

    if (!listMovie) {
      return res.status(404).json({ error: 'Movie not found in the list' });
    }

    listMovie.rating = rating;
    await listMovie.save();

    logger.info(`User ${req.user.id} updated rating of movie ${movieId} in list ${listId} to ${rating}`);
    res.json(listMovie);
  } catch (error) {
    logger.error(`Error updating movie rating: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMovieFromList = async (req, res) => {
  try {
    const { listId, movieId } = req.params;
    const listMovie = await ListMovie.findOne({
      where: { listId, movieId },
    });

    if (!listMovie) {
      return res.status(404).json({ error: 'Movie not found in the list' });
    }

    await listMovie.destroy();

    logger.info(`User ${req.user.id} deleted movie ${movieId} from list ${listId}`);
    res.status(204).end();
  } catch (error) {
    logger.error(`Error deleting movie from list: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.findAll({ where: { userId: req.user.id } });
    logger.info(`User ${req.user.id} fetched their lists`);
    res.json(lists);
  } catch (error) {
    logger.error(`Error fetching lists: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch lists' });
  }
};

exports.getMoviesFromList = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    const listMovies = await ListMovie.findAll({
      where: { listId },
    });
    const movieIds = listMovies.map((listMovie) => listMovie.movieId);
    const movies = await Movie.findAll({
      where: { id: movieIds }
    });

    const moviesWithDetails = await Promise.all(movies.map(async (movie) => {
      const movieDetails = await omdbService.getMovieByImdbId(movie.imdbId);
      const listMovie = listMovies.find(lm => lm.movieId === movie.id);
      return {
        ...movieDetails,
        localId: listMovie.id,
        movieID: movie.id,
        listId: listId,
        userRating: listMovie.rating || '',
      };
    }));

    logger.info(`User ${req.user.id} fetched movies from list ${listId}`);
    res.json(moviesWithDetails);
  } catch (error) {
    logger.error(`Error fetching movies from list: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch movies from list' });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { listId } = req.params;
    const list = await List.findOne({ where: { id: listId, userId: req.user.id } });
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    await ListMovie.destroy({ where: { listId: list.id } });
    await list.destroy();

    logger.info(`User ${req.user.id} deleted list ${listId}`);
    res.status(204).end();
  } catch (error) {
    logger.error(`Error deleting list: ${error.message}`);
    res.status(500).json({ error: 'Failed to delete list' });
  }
};
