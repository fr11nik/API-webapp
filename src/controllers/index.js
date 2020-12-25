const userController = require('./user');
const tokenController = require('./token');
const joiController = require('./joi');

module.exports = {
  user: userController,
  token: tokenController,
  joi: joiController,
};
