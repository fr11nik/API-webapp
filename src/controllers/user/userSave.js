const User = require('../../models/User');
const {DatabaseError} = require('../../config/errorCfg');
module.exports = async function ({name, email, password}) {
  const user = new User({
    name,
    email,
    password,
  });
  const resultSave = await user.save();
  if (!resultSave) {
    throw new DatabaseError("the user hasn't been saved");
  }
  return;
};
