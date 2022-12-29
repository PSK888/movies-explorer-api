const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { validationAddMovie, validationDeleteMovie } = require('../middlewares/validations');

router.get('/movies', getMovies);
router.post('/movies', validationAddMovie, addMovie);
router.delete('/movies/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
