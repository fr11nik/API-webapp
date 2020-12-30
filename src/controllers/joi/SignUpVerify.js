const Joi = require('@hapi/joi');
const validateJoi = require('./validate.joi');
const userSchemaValidation = Joi.object({
  email: Joi.string().min(2).max(25).email().required(),
  username: Joi.string().min(5).max(20).required(),
  password: Joi.string().min(6).required(),
});
const t = () => {
  validateJoi(userSchemaValidation);
};
module.exports = (req, res, next) => {
  const userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };
  var errors = validateJoi(userSchemaValidation, userData);
  if (errors) {
    res.send(errors);
    return;
  }
  next();
};
