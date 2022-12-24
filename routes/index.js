const router = require('express').Router();
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerAuth = require('./auth');

router.use(routerAuth);
router.use(auth);
router.use(routerUsers);
router.use(routerMovies);

module.exports = router;
