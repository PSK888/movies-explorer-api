const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerAuth = require('./auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(routerAuth);
router.use(auth);
router.use(routerUsers);
router.use(routerMovies);
router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

module.exports = router;
