const WorkSchedule = require('../../../models').WorkSchedule;
const Schedule = WorkSchedule.schedules;

const getSchedules = (req, res) => {
  Schedule.findAll({attributes:['id','scheduleName']})
    .then(data => res.send(data))
    .catch(err => {
      res.status(401).send({message: err});
    });
};
module.exports = getSchedules;
