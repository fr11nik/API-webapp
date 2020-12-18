const db = require('../models');
const item = () => {
  db.sequelize
    .sync()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
};
module.exports.load = item;
