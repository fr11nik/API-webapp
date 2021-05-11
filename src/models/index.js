const {sequelize, Sequelize} = require('./sequelize.model');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.token = require('./token.model')(sequelize, Sequelize);
db.personalData = require('./userContact.model')(sequelize, Sequelize);
db.WorkSchedule = require('./workschedule');
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
db.ROLES = ['user', 'admin', 'moderator', 'director'];
module.exports = db;
