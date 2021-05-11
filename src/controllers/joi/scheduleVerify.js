const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');
const Validation = Joi.object({
  scheduleName: Joi.string().min(4).max(300).required(),
});
const t = () => {
  validateJoi(Validation);
};
module.exports = (req, res, next) => {
  const schedule = {
    scheduleName: req.body.scheduleName,
  };
  var errors = validateJoi(Validation, schedule);
  if (errors) {
    res.status(400).send({
      message: errors,
    });
    return;
  }
  next();
};
