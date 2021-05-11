const router = require('express').Router();
const controller = require('../controllers');
const {verifySignUp, authJwt} = require('../middlewares');

router.post('/register', controller.user.auth.authMongoose.signUp);

router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail.checkUser,
    verifySignUp.checkDuplicateUsernameOrEmail.checkEmail,
    controller.joi.signUpVerify,
    verifySignUp.checkRolesExisted,
  ],
  controller.user.auth.authMySQL.signup,
);

router.post('/signin', controller.user.auth.authMySQL.signin);



module.exports = router;
