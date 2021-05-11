const {sequelize, Sequelize} = require('.././sequelize.model');

const models = {
  Units: require('./units.model')(sequelize, Sequelize),
  WorkType: require('./workType.model')(sequelize, Sequelize),
  Schedule: require('./schedules.model')(sequelize, Sequelize),
  WorkSchedule: require('./workschedule.model')(sequelize, Sequelize),
  Crossings: require('./crossings.model')(sequelize, Sequelize),
  WorkTypeList: require('./workTypeList.model')(sequelize, Sequelize),
};

for (const [, model] of Object.entries(models)) {
  model.associate(models);
}

module.exports = {
  units: models.Units,
  workType: models.WorkType,
  schedules: models.Schedule,
  MainTable: models.WorkSchedule,
  crossings: models.Crossings,
  workTypeList: models.WorkTypeList,
};
