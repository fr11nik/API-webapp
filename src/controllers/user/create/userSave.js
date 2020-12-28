const User = require('../../../models').user;
const UserPersonalData = require('../../../models').personalData;
const setRoles = require('../setRoles/setRoles');
const bcrypt = require('bcryptjs');

const createUser = async ({
  firstname,
  lastname,
  phonenumber,
  username,
  password,
  roles,
}) => {
  return new Promise((resolve, reject) => {
    User.create({
      username: username,
      password: bcrypt.hashSync(password, 8),
    }).then(user => {
      setRoles(user, roles).then(setRolesResult => {
        if (setRolesResult) {
          UserPersonalData.create({
            firstname,
            lastname,
            phonenumber,
            userAuthId: user.id,
          })
            .then(() => {
              resolve('the user was beign created !');
            })
            .catch(err => {
              reject(err);
            });
        }
      });
    });
  });
};

module.exports = createUser;
