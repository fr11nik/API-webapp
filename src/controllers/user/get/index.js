const db = require('../../../models');
const User = db.user;
const UserPersonalData = db.personalData;
const Info = {};
getInfo = (req, res) => {
  User.findAll({attributes: ['id', 'username', 'email']})
    .then(users =>
      Promise.all(
        users.map(user =>
          Promise.all([
            user.getRoles({attributes: ['name']}),
            UserPersonalData.findOne({
              where: {
                userAuthId: user.id,
              },
              attributes: ['id', 'firstname', 'lastname', 'phonenumber'],
            }),
          ]).then(([roles, personalData]) => {
            const userRoles = [];
            roles.map(role => {
              userRoles.push(role.name);
            });
            if (personalData != null) {
              return {authData: user, personalData, userRoles};
            } else return {authData: user, personalData: [], userRoles};
          }),
        ),
      ),
    )
    .then(result => {
      res.send(result);
    });
};
module.exports = getInfo;
