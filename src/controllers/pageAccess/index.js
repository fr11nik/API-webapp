const {authJwt} = require('../../middlewares');

exports.allAccess = (req, res) => {
  res.status(200).send('Public Content.');
};
exports.resultAccess = (req, res) => {
  res.status(200).send(200).send('Access is valid!');
};
exports.userBoard = (req, res) => {
  res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.');
};
const resultAccesss = (req, res) => {
  res.status(200);
};
exports.separatePermission = (req, res) => {
  var name = req.params.permission;
  if (name == 'adminpanel') {
    authJwt.isAdmin(req,res);
    res.status(200).send({message: name});
    return;
  }
  if (name == 'employeepanel') {
    res.status(200).send({message: name});
    return;
  }
  if (name == 'moderatorpanel') {
    authJwt.isModerator(req,res);
    res.status(200).send({message: name});
    return;
  }
  // default:
  res.status(403).send({message: 'Страница не найдена'});
};
