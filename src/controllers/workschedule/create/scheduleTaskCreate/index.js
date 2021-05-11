const scheduleTaskCreate = require('./scheduleTask');
const scheduleTask = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  scheduleTaskCreate(req.workSchedule, req.body.scheduleName)
    .then(result => res.send({message: result}))
    .catch(err => {
      res.status(401).send({message: err});
    });
};

module.exports = scheduleTask;
