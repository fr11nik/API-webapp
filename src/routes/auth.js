const router = require('express').Router();
const controllers = require('../controllers');
const {verifySignUp} = require('../middlewares');

router.post('/register', controllers.userController.register);

router.post(
  '/signup',
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  controllers.userController.auth.signup,
);

router.post('/signin', controllers.userController.auth.signin);

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
