const auth = require('./auth');
const pageRouting = require('./pageRouting');
const accessToken = require('./access');
const commands = require('./commands');
//use all routes
module.exports = app => {
  app.use(pageRouting);
  app.use('/api/user', auth);
  app.use('/api/user', accessToken);
  app.use(commands);
  return app;
};
