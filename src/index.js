const express = require('express');
const config = require('./config');

async function startServer() {
  const app = express();
  require('./loaders')(app);
  app
    .listen(config.port, () => console.log('Server up and running'))
    .on('error', err => {
      console.log(err);
      process.exit(1);
    });
}
startServer();
  