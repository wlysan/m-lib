const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, movieController.addMovie);
router.post('/rate', authMiddleware, movieController.rateMovie);

module.exports = router;
