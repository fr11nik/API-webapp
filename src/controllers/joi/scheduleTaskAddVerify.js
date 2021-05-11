const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');
const Validation = Joi.object({
  taskDescription: Joi.string().min(4).required(),
  crossing: Joi.string().allow(null, ''),
  date: Joi.date().required(),
  personalCount: Joi.number().required(),
  technicsCount: Joi.number().required(),
  allByProject: Joi.number().required(),
});

module.exports = (req, res, next) => {
  const workSchedule = {
    taskDescription: req.body.taskDescription,
    crossing: req.body.crossing,
    date: req.body.date,
    personalCount: req.body.personalCount,
    technicsCount: req.body.technicsCount,
    allByProject: req.body.allByProject,
  };
  var errors = validateJoi(Validation, workSchedule);
  if (errors) {
    res.status(400).send({
      message: errors,
    });
    return;
  }
  workSchedule.scheduleName = req.body.scheduleName;
  workSchedule.unitName = req.body.unitName;
  workSchedule.workType = req.body.workType;
  req.workSchedule = workSchedule;
  next();
};
