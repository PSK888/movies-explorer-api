const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../middlewares/validations');

router.post('/signup', validationCreateUser, createUser);

router.post('/signin', validationLogin, login);

module.exports = router;
