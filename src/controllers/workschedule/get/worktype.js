const WorkSchedule = require('../../../models').WorkSchedule;
const WorkType = WorkSchedule.workType;

const getWorkTypes = (req, res) => {
  WorkType.findAll({attributes: ['id', 'typeName']})
    .then(data => res.send(data))
    .catch(err => {
      res.status(401).send({message: err});
    });
};
module.exports = getWorkTypes;
