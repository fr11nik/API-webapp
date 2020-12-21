module.exports = (sequelize, Sequelize) => {
  const User = require('./user.model')(sequelize, Sequelize);
  const Token = sequelize.define('tokens', {
    tokenId: {
      type: Sequelize.STRING,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
  User.hasMany(Token);
  return Token;
};
