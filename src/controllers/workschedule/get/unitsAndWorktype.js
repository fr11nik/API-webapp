const WorkSchedule = require('../../../models').WorkSchedule;
const Units = WorkSchedule.units;
const WorkType = WorkSchedule.workType;

const getUnitsAndWorktype = (req, res) => {
  const workTypesAndUnits = {};
  Units.findAll({attributes: ['id', 'unitName']})
    .then(
      data => (workTypesAndUnits.units = data),
      WorkType.findAll({attributes: ['id', 'typeName']})
        .then(data => {
          workTypesAndUnits.workTypes = data;
          res.send(workTypesAndUnits);
        })
        .catch(err => res.status(401).send({message: err})),
    )
    .catch(err => res.status(401).send({message: err}));
};
module.exports = getUnitsAndWorktype;
