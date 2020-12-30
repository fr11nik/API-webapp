const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  let token = req.headers['x-acces-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: err.message,
      });
      return;
    }
    if (decoded.type !== 'access') {
      res.status(401).send({});
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Admin Role!',
      }); 
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name == 'moderator') {
          next();
          return;
        }
      }
      res.status(403).send({
        message: 'Require Moderator Role!',
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }

        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }

      res.status(403).send({
        message: 'Require Moderator or Admin Role!',
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
