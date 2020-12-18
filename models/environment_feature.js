const { sequelize } = require(".");
const Environment = require("./environment");
const Feature = require("./feature");

module.exports = (sequelize) => {
  const Environment_Feature = sequelize.define("Environment_Feature", {}, {timestamps: false});
  Environment.belongsToMany(Feature, {through: Environment_Feature});
  Feature.belongsToMany(Environment, {through: Environment_Feature});
  return Environment_Feature;
};
