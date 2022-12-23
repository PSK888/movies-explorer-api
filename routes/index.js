const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const NotFoundError = require('../errors/NotFoundError');
const routerUsers = require('./users');
const routerMovies = require('./movies');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

router.use(auth, (req, res, next) => {
  next(new NotFoundError('Ресурс не найден'));
});

module.exports = router;
