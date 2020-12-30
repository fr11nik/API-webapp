module.exports = (sequelize, Sequelize) => {
  const UserContact = sequelize.define('usersContactData', {
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    phonenumber: {
      type: Sequelize.STRING(11),
    },
    userAuthId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  });
  return UserContact;
};
