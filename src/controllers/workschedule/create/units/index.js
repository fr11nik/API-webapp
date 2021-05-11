const verify = require('../../../joi').fieldVerify;

const createUnit = require('./createUnit');
const unit = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  const errors = verify(req.body.unitName, 1, 15);
  if (errors != '') res.status(401).send(errors);
  const unitNameLower = req.body.unitName.toLowerCase();
  createUnit(unitNameLower).then(data =>
    res.status(data.status).send({message: data.message}),
  );
};
module.exports = unit;
