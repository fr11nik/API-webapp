module.exports = (sequelize, Sequelize) => {
  const WorkTypeList = sequelize.define('worktypelist');

  WorkTypeList.associate = function (models) {
    WorkTypeList.belongsTo(models.WorkType, {
      foreignKey: 'workTypeID',
      sourceKey: 'id',
    });
    WorkTypeList.belongsTo(models.WorkSchedule, {
      foreignKey: 'taskID',
      sourceKey: 'id',
    });
  };
  return WorkTypeList;
};
