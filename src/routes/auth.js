const router = require('express').Router();
const controller = require('../controllers');
const {verifySignUp, authJwt} = require('../middlewares');

router.post('/register', controller.user.auth.authMongoose.signUp);

router.post(
  '/signup',
  [
    verifySignUp.checkDuplicateUsernameOrEmail.checkUser,
    verifySignUp.checkDuplicateUsernameOrEmail.checkEmail,
    verifySignUp.checkRolesExisted,
  ],
  controller.user.auth.authMySQL.signup,
);

router.post('/signin', controller.user.auth.authMySQL.signin);
router.post('/refresh-tokens', controller.token.refreshTokens);

module.exports = app => {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  return router;
};
