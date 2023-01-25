const router = require('express').Router();

const { getUserInfo, updateUserInfo } = require('../controllers/users');

const { validationUpdateUserInfo } = require('../middlewares/validations');

router.get('/users/me', getUserInfo);

router.patch('/users/me', validationUpdateUserInfo, updateUserInfo);

module.exports = router;
