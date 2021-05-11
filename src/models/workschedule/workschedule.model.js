module.exports = (sequelize, Sequelize) => {
  const WorkSchedule = sequelize.define('workschedules', {
    taskName: {
      type: Sequelize.STRING,
    },
    allByProject: {
      type: Sequelize.INTEGER,
    },
    crossing: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
    },
    personalCount: {
      type: Sequelize.INTEGER,
    },
    technicsCount: {
      type: Sequelize.INTEGER,
    },
  });
  WorkSchedule.associate = models => {
    WorkSchedule.belongsTo(models.Schedule, {
      foreignKey: 'scheduleId',
      sourceKey: 'id',
    });
    WorkSchedule.belongsTo(models.WorkType, {
      foreignKey: 'workTypeID',
      sourceKey: 'id',
    });
    WorkSchedule.belongsTo(models.Units, {
      foreignKey: 'unitID',
      sourceKey: 'id',
    });
  };
  return WorkSchedule;
};
