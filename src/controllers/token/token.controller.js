const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config').jwt;
const Token = require('../../models').token;

const generateAccessToken = userId => {
  const payLoad = {
    userId,
    type: jwtConfig.tokens.access.type,
  };
  const options = {expiresIn: jwtConfig.tokens.access.expiresIn};

  return jwt.sign(payLoad, jwtConfig.authSecret, options);
};

const generateRefreshToken = () => {
  const payLoad = {
    id: uuid(),
    type: jwtConfig.tokens.refresh.type,
  };
  const options = {expiresIn: jwtConfig.tokens.refresh.expiresIn};
  return {
    id: payLoad.id,
    token: jwt.sign(payLoad, jwtConfig.authSecret, options),
  };
};
const replaceDataBaseRefreshToken = (tokenId, userId) => {
  Token.findOneAndRemove({userId}).then(token => {
    token.create({tokenId, userId});
  });
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDataBaseRefreshToken,
};
//WIP 1:45 PM 12/21/2020
