const Scenario = require("./scenario");

module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define(
    "Step",
    {
      testcase_step_title: DataTypes.STRING,
      testcase_step_status: DataTypes.STRING,
      error_message: { type: DataTypes.TEXT, require: false, allowNull: true },
    },
    { timestamp: false }
  );
  Step.belongsTo(Scenario);
  return Step;
};
