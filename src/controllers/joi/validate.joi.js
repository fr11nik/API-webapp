module.exports = (joiSchema, reqBody) => {
  const validateResult = joiSchema.validate(reqBody);
  if (validateResult.error != null) {
    return validateResult.error.message;
  }
  return;
};
