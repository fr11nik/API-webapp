const {authJwt} = require('../middlewares');
const router = require('express').Router();

router.get('/verify', [authJwt.verifyToken], (res, req) => res.send('Cool'));

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
