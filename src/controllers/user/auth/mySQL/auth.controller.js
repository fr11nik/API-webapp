const db = require('../../../../models');
const token = require('../../../token');
const bcrypt = require('bcryptjs');
const cookie = require('cookie');

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({message: 'User was registered successfully!'});
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({message: 'User was registered successfully!'});
        });
      }
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(user => {
      if (!user) {
        //User not found
        return res.status(404).send({message: 'Invalid login or password'});
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          //Invalid password
          message: 'Invalid login or password',
        });
      }
      var outputTokens = {};
      token.updateToken(user.id).then(tokens => {
        outputTokens.accessToken = tokens.accessToken;
        outputTokens.refreshToken = tokens.refreshToken;
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          tokens: {
            accessToken: outputTokens.accessToken,
            refreshToken: outputTokens.refreshToken,
          },
        });
      });
    })
    .catch(err => {
      res.status(500).send({message: err.message});
    });
};
