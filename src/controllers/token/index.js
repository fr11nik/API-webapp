const {
  generateAccessToken,
  generateRefreshToken,
  replaceDataBaseRefreshToken,
  ableToRefreshToken,
} = require('./token.controller');

const updateToken = userId => {
  return new Promise((resolve, reject) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();
    replaceDataBaseRefreshToken(refreshToken.id, userId);
    resolve({accessToken, refreshToken: refreshToken.token});
  });
};
const refreshTokens = (req, res) => {
  res.header('Origin, Content-Type, Accept');
  ableToRefreshToken(req.body.refreshToken)
    .then(upgrade => {
      if (upgrade.isRefreshToken) {
        updateToken(upgrade.userId)
          .then(tokens => res.send(tokens))
          .catch(err => res.status(400).send({message: err.message}));
      } else res.send({message: 'Invalid token!'});
    })
    .catch(error => {
      res.status(400).send({message: error});
      return;
    });
};

module.exports = {
  updateToken,
  refreshTokens,
};
