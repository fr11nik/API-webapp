const scheduleCreate = require('./scheduleCreate');
const scheduleSave = (req, res) => {
  res.header('x-acces-token, Origin, Content-Type, Accept');
  const scheduleData = {
    scheduleName: req.body.scheduleName,
  };
  scheduleCreate(scheduleData)
    .then(result => res.send({message: result}))
    .catch(err => {
      res.status(401).send({message: err});
    });
};

module.exports = scheduleSave;
