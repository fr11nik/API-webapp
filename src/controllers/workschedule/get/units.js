const WorkSchedule = require('../../../models').WorkSchedule;
const Units = WorkSchedule.units;

const getUnits = (req, res) => {
  Units.findAll({attributes: ['id', 'unitName']})
    .then(data => res.send(data))
    .catch(err => {
      res.status(401).send({message: err});
    });
};
module.exports = getUnits;
