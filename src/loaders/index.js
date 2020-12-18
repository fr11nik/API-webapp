const expressRoute = require('./express');
const mongooseLoader = require('./mongoose');
const bodyParser = require('body-parser');
const mySqlLoader = require('./mysqlLoader');
module.exports = app => {
  //bodyParser json file
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  var module = {};
  module.mongoLoader = async () => await mongooseLoader;
  module.allRouting = expressRoute(app);
  module.dbLoader = mySqlLoader.load;
  console.log('the items have been loaded 👌');
  return module;
};
