const fs = require('fs');
require("dotenv").config();

module.exports = {
  development: {
    username: 'root',
    password: 'coeurame2!',
    database: 'extentreports_dev',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: "-06:00"
  },
  test: {
    username: 'root',
    password: 'coeurame2!',
    database: 'extentreports_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: "-06:00"
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // },
    timezone: "-06:00"
  }
};