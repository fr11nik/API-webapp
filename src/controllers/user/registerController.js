const Joi = require('@hapi/joi');
const userSave = require('./userSave');
const userSchemaValidation = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});
//req , res have to change on {email, name , password} 11:47 PM
module.exports = (req, res) => {
  const validateResult = userSchemaValidation.validate(req.body);
  if (validateResult.error != null) {
    res.status(400).send(validateResult.error.message);
    return;
  }
  if (
    userSave({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
  ) {
    res.send('the user has been created (MongoDB)');
  }
};
