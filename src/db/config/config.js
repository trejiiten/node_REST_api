require("dotenv").config();
const fs = require('fs');

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'extentreports_dev',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    timezone: "-06:00"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'extentreports_test',
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    timezone: "-06:00"
  },
  production: {
    username: process.env.XD_DB_USERNAME,
    password: process.env.XD_DB_PASSWORD,
    database: process.env.XD_DB_NAME,
    host: process.env.XD_DB_HOSTNAME,
    dialect: 'mysql',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // },
    timezone: "-06:00"
  }
};