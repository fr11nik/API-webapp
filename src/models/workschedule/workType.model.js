module.exports = (sequelize, Sequelize) => {
  const WorkType = sequelize.define('worktypes', {
    typeName: {
      type: Sequelize.STRING,
    },
  });
  WorkType.associate = models => {
    WorkType.hasMany(models.WorkSchedule, {
      sourceKey: 'id',
      foreignKey: 'workTypeID',
    });
    WorkType.hasMany(models.WorkTypeList, {
      sourceKey: 'id',
      foreignKey: 'workTypeID',
    });
  };
  return WorkType;
};
