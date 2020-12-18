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
  if (validateResult.error == null) {
    userSave({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }).then(() => {
      return res.send({message: 'The user has been succesfuly created'});
    });
  } else res.send(validateResult.error.message);
};
