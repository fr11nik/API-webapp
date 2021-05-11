module.exports = (sequelize, Sequelize) => {
  const Crossings = sequelize.define('crossings', {
    crossingName: {
      type: Sequelize.STRING,
    },
  });
  Crossings.associate = function (models) {
    Crossings.belongsTo(models.WorkSchedule, {
      foreignKey: 'taskID',
      sourceKey: 'id',
    });
  };
  return Crossings;
};
