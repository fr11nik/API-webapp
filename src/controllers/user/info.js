const db = require('../../models');

const User = db.user;
const UserPersonalData = db.personalData;
const Info = {};
getInfo = (req, res) => {
  User.findOne({
    where: {
      id: req.userId,
    },
  }).then(user => {
    user.getRoles().then(roles => {
      const rolesList = [];
      roles.map((role, index) => {
        rolesList.push(role.name);
      });
      Info.roles = rolesList;
    });
    Info.id = req.userId;
    Info.login = user.username;
    Info.email = user.email;
    UserPersonalData.findOne({
      where: {
        userAuthId: Info.id,
      },
    }).then(userPeronalData => {
      Info.firstname = userPeronalData.firstname;
      Info.lastname = userPeronalData.lastname;
      Info.phonenumber = userPeronalData.phonenumber;

      res.status(200).send({
        Info,
      });
    });
  });
};
module.exports = getInfo;
