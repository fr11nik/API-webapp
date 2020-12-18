const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.databaseConfig.db,
  config.databaseConfig.user,
  config.databaseConfig.password,
  {
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
//Create table user_roles via relation the belongsToMany
db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});
db.ROLES = ['user', 'admin', 'moderator'];

module.exports = db;
