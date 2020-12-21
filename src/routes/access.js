const {authJwt} = require('../middlewares');
const router = require('express').Router();
const User = require('../models').user;
const t = (req, res) => {
  nextLayer({userId: req.userId}, res);
};
const nextLayer = ({userId}, res) => {
  User.findOne({
    where: {
      id: userId,
    },
  }).then(user => {
    res.send(user);
  });
};
router.get('/verify', [authJwt.verifyToken], t);

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
