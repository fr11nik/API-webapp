const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');
const Validation = Joi.object({
  allByProject: Joi.number().required(),
  crossing1: Joi.string().allow(null, ''),
  crossing2: Joi.string().allow(null, ''),
  date: Joi.date().required(),
  personalCount: Joi.number().required(),
  scheduleName: Joi.string().required(),
  taskDescription: Joi.string().min(4).required(),
  technicsCount: Joi.number().required(),
  unitName: Joi.string().required(),
  worktype1: Joi.string().required(),
  worktype2: Joi.string().allow(null, ''),
});

module.exports = (req, res, next) => {
  const workSchedule = {
    allByProject: req.body.allByProject,
    crossing1: req.body.crossing1,
    crossing2: req.body.crossing2,
    date: req.body.date,
    personalCount: req.body.personalCount,
    scheduleName: req.body.scheduleName,
    taskDescription: req.body.taskDescription,
    technicsCount: req.body.technicsCount,
    unitName: req.body.unitName,
    worktype1: req.body.worktype1,
    worktype2: req.body.worktype2,
  };
  var errors = validateJoi(Validation, workSchedule);
  if (errors) {
    res.status(400).send({
      message: errors,
    });
    return;
  }
  req.workSchedule = workSchedule;
  next();
};
