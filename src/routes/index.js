const auth = require('./auth');
const pageRouting = require('./pageRouting');
const accessToken = require('./access');
//use all routes
module.exports = app => {
  app.use(pageRouting);
  app.use('/api/user', auth(app));
  app.use('/api/user', accessToken(app));
  return app;
};
