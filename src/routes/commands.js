const router = require('express').Router();
const {verifySignUp, authJwt} = require('../middlewares');
const joiVerify = require('../controllers').joi;
const userController = require('../controllers').user;

router.post(
  '/node-cm/createUser',
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkDuplicateUsernameOrEmail.checkUser,
    verifySignUp.checkRolesExisted,
    joiVerify.createUserVerify,
  ],
  userController.create,
);

module.exports = router;
