const registerController = require('./registerController');
const auth = require('../auth/auth.controller');
const userOption = {
  register: registerController,
  auth,
};

module.exports = userOption;
