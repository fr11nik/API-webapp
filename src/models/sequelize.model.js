const config = require('../config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.databaseConfig.db,
  config.databaseConfig.user,
  config.databaseConfig.password,
  {
    //remove loggin in the cmd (default value console.log)
    logging: config.databaseConfig.logging,
    host: config.databaseConfig.host,
    dialect: config.databaseConfig.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.databaseConfig.pool.max,
      mix: config.databaseConfig.pool.min,
      acquire: config.databaseConfig.pool.poolAcquire,
      idle: config.databaseConfig.pool.poolIdle,
    },
  },
);
module.exports = {
  sequelize,
  Sequelize,
};
