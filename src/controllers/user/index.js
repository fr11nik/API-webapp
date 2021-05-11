const auth = require('./auth');
const create = require('./create');
const getInfo = require('./info');
const get = require('./get');
const method = {
  auth,
  create,
  getInfo,
  get,
};
module.exports = method;
