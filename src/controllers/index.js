const userController = require('./user');
const tokenController = require('./token');
const joiController = require('./joi');
const pageAccess = require('./pageAccess');
const workSchedule = require('./workschedule');
module.exports = {
  user: userController,
  token: tokenController,
  joi: joiController,
  pageAccess,
  workSchedule,
};
