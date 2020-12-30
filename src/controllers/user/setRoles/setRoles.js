const db = require('../../../models');
const Role = db.role;
const Op = db.Sequelize.Op;

const setAllRoles = async (user, roleList) => {
  await Role.findAll({
    where: {
      name: {
        [Op.or]: roleList,
      },
    },
  }).then(roles => {
    user.setRoles(roles);
    return;
  });
};

const setRoles = (user, roleList) => {
  return new Promise((resolve, reject) => {
    (async () => {
      if (roleList) {
        await setAllRoles(user, roleList);
        resolve(true);
      } else {
        user.setRoles([1]).then(() => {
          resolve(true);
        });
      }
    })();
  });
};

module.exports = setRoles;
