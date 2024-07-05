const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, listController.createList);
router.post('/add-movie', authMiddleware, listController.addMovieToList);
router.put('/update-rating', authMiddleware, listController.updateMovieRating);
router.delete('/:listId/:movieId', authMiddleware, listController.deleteMovieFromList);
router.get('/', authMiddleware, listController.getLists);
router.get('/:listId/movies', authMiddleware, listController.getMoviesFromList);
router.delete('/:listId', authMiddleware, listController.deleteList);

module.exports = router;
