const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');
const Validation = Joi.object({
  allByProject: Joi.number().required(),
  date: Joi.date().required(),
  personalCount: Joi.number().required(),
  taskName: Joi.string().min(4).required(),
  technicsCount: Joi.number().required(),
  id: Joi.number().required(),
  scheduleId: Joi.number().required(),
});

module.exports = (req, res, next) => {
  const crossing = req.body.crossing;
  for (let i = 0; i < 2; i++) {
    const element = crossing[i];
    if (element.crossingName) {
      element.crossingName = element.crossingName.trim();
    }
    if (element.id != '-') {
      if (element.crossingName.length <= 0 || element.crossingName.length > 200) {
        const currentField = i + 1;
        res.status(400).send({
          message:
            'Длина поля `Перечение ' +
            currentField +
            '` должна быть не пустой и не больше 200 символов',
        });
        return;
      }
    } else {
    }
  }
  const body = {
    allByProject: req.body.allByProject,
    date: req.body.date,
    personalCount: req.body.personalCount,
    taskName: req.body.taskName,
    technicsCount: req.body.technicsCount,
    id: req.body.id,
    scheduleId: req.body.scheduleId,
  };
  var errors = validateJoi(Validation, body);
  if (errors) {
    res.status(400).send({
      message: errors,
    });
    return;
  }

  body.worktypes = req.body.worktypes;
  body.crossing = req.body.crossing;
  body.unit = req.body.unit;
  req.workSchedule = body;
  next();
};
