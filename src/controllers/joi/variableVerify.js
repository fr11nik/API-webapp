const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');

const verifyField = (field, minValue, maxValue) => {
  const Validation = Joi.object({
    field: Joi.string().min(minValue).max(maxValue).required(),
  });
  const scheme = {
    field,
  };
  var errors = validateJoi(Validation, scheme);
  if (errors) {
    return errors;
  }
  return '';
};

module.exports = verifyField;
