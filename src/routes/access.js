const {authJwt} = require('../middlewares');
const router = require('express').Router();
const User = require('../models').user;
const controller = require('../controllers');

router.post('/refresh-tokens', controller.token.refreshTokens);

module.exports = router;
