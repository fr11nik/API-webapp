const auth = require('../auth/auth.controller');
const Save = require('./registerController');

const method = {
  save: Save,
  auth,
};
module.exports = method;
