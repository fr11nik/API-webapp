const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ['POST', 'GET', 'OPTIONS'],
};

module.exports = {
  cors,
  corsOptions,
};
