module.exports = (sequelize, Sequelize) => {
  const Schedules = sequelize.define('schedules', {
    scheduleName: {
      type: Sequelize.STRING,
    },
  });
  Schedules.associate = function (models) {
    Schedules.hasMany(models.WorkSchedule, {
      sourceKey: 'id',
      foreignKey: 'scheduleId',
    });
  };
  return Schedules;
};
