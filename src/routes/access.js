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
    user.getRoles().then(roles => {
      res.send(roles);
    });
  });
};
router.get('/verify', [authJwt.verifyToken, authJwt.isAdmin], t);

module.exports = router;
