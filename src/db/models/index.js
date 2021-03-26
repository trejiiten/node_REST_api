require("dotenv").config();
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  )
}

const models = [];
glob.sync(`${__dirname}/*.js`).forEach((model) => {
  const modelname = path.basename(model);
  if (modelname !== 'index.js') {
    models.push(require(`${__dirname}/${modelname}`));
  }

  models.forEach((module) => {
    const sequelizeModel = module(sequelize, Sequelize);
    db[sequelizeModel.name] = sequelizeModel;
  });
});

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     )
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     )
//     db[model.name] = model
//   })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db