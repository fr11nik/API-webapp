const mongoose = require('mongoose');
const config = require('../config');

module.exports = (async () => {
  const connection = await mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  return connection.connection.db;
})();
console.log('DB loaded and connected!');
