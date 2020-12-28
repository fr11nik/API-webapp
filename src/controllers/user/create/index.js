const userSave = require('./userSave');

const startSave = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    username: req.body.username,
    password: req.body.password,
    roles: req.body.roles,
  };
  userSave(userData)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

module.exports = startSave;
