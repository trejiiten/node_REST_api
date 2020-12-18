const Step = require("./step");
const Feature = require("./feature");

module.exports = (sequelize, DataTypes) => {
  const Scenario = sequelize.define("Scenario", {
    testcase_title: DataTypes.STRING,
    time_start: DataTypes.DATE,
    time_end: DataTypes.DATE,
  });
  Scenario.hasMany(Step);
  Scenario.belongsTo(Feature);
  return Scenario;
};
