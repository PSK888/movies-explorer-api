const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const DataError = require('../errors/DataError');
const RightsError = require('../errors/RightsError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Видеофайл не найден');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new RightsError('Нельзя удалить видео другого пользователя'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Видеофайл удален' }));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
