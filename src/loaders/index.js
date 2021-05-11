const expressRoute = require('./express');
//const mongooseLoader = require('./mongoose');
const bodyParser = require('body-parser');
const mySqlLoader = require('./mysqlLoader');
const corsLoader = require('./cors');
const cookieParser = require('cookie-parser');

module.exports = app => {
  //bodyParser json file
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(corsLoader.cors(corsLoader.corsOptions));
  app.use(cookieParser());
  var module = {};
  //module.mongoLoader = async () => await mongooseLoader;
  module.allRouting = expressRoute(app);
  module.dbLoader = mySqlLoader;
  console.log('the items have been loaded 👌');
  return module;
};
