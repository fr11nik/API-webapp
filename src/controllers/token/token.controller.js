const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config').jwt;
const Token = require('../../models').token;
const {TokenError} = require('../../config/errorCfg');
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
    id: uuidv4(),
    type: jwtConfig.tokens.refresh.type,
  };
  const options = {expiresIn: jwtConfig.tokens.refresh.expiresIn};
  return {
    id: payLoad.id,
    token: jwt.sign(payLoad, jwtConfig.authSecret, options),
  };
};
const replaceDataBaseRefreshToken = (tokenId, idUser) => {
  Token.findOne({
    where: {
      userId: idUser,
    },
  }).then(token => {
    if (token != null) {
      token.destroy({where: {userId: idUser}});
    }
    Token.create({
      tokenId,
      userId: idUser,
    });
  });
};
const ableToRefreshToken = refreshToken => {
  return new Promise((resolve, reject) => {
    (async () => {
      var payLoad;
      var isRefreshToken = false;
      try {
        payLoad = jwt.verify(refreshToken, jwtConfig.authSecret);
        var isRefreshToken = payLoad.type !== 'refresh';
      } catch (err) {
        reject(err);
      }
      await Token.findOne({where: {tokenId: payLoad.id}}).then(token => {
        if (token === null) {
          throw new TokenError('token is not valid');
        } else isRefreshToken = true;
        resolve({
          error: null,
          isRefreshToken,
          userId: token.userId,
        });
      });
    })();
  });
};
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDataBaseRefreshToken,
  ableToRefreshToken,
};
//WIP 1:45 PM 12/21/2020
