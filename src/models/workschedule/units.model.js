module.exports = (sequelize, Sequelize) => {
  const Units = sequelize.define('units', {
    unitName: {
      type: Sequelize.STRING,
    },
  });
  Units.associate = models => {
    Units.hasMany(models.WorkSchedule, {
      sourceKey: 'id',
      foreignKey: 'unitID',
    });
  };
  return Units;
};
