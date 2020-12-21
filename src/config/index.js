const dotenv = require('dotenv');
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}
const config = {
  //default port
  port: process.env.PORT,
  //db Connection Propeties
  databaseUrl: process.env.DB_CONNECT,
  api: {
    prefix: '/api',
  },
  databaseConfig: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    db: process.env.DB,
    dialect: process.env.DIALECT,
    pool: {
      max: Number.parseInt(process.env.POOLMAX),
      min: Number.parseInt(process.env.POOLMIN),
      poolAcquire: Number.parseInt(process.env.POOLACQUIRE),
      poolIdle: Number.parseInt(process.env.POOLIDLE),
    },
    logging: false,
  },
  jwt: {
    authSecret: process.env.AUTHSECRET,
    tokens: {
      access: {
        type: 'access',
        expiresIn: 1800, //30 min
      },
      refresh: {
        type: 'refresh',
        expiresIn: 2592000, //30 days
      },
    },
  },
};
module.exports = config;
