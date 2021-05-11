const worktypecreate = require('./workTypeCreate');
const verify = require('../../../joi').fieldVerify;
const workType = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  const errors = verify(req.body.typeName, 4, 300);
  if (errors != '') res.status(401).send(errors);
  const typeNameLower = req.body.typeName.toLowerCase();
  worktypecreate(typeNameLower).then(result => {
    res.status(result.status).send({message: result.message});
  });
};
module.exports = workType;
