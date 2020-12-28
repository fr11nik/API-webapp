const authMySql = require('./mySQL/auth.controller');
const authMongoose = require('./mongoose/registerController');

const method = {
  authMongoose: authMongoose,
  authMySQL: authMySql,
};
module.exports = method;
