const config = require('./index');
module.exports = {
  HOST: config.databaseConfig.host,
  USER: config.databaseConfig.user,
  PASSWORD: config.databaseConfig.password,
  DB: config.databaseConfig.db,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
