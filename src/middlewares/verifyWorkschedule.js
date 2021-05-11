const Schedule = require('../models').WorkSchedule.schedules;

const duplicatesCheck = (req, res, next) => {
  Schedule.findOne({
    where: {
      scheduleName: req.body.scheduleName,
    },
  }).then(schedule => {
    if (schedule) {
      res.status(400).send({
        message: 'Ошибка такой график уже существует!',
      });
      return;
    }
    next();
  });
};
module.exports = duplicatesCheck;
