const sequelize = require('sequelize')
const Scenario = require('./scenario')

// module.exports = (sequelize, DataTypes) => {
//   const Step = sequelize.define(
//     'Step',
//     {
//       testcase_step_title: DataTypes.STRING,
//       testcase_step_status: DataTypes.STRING,
//       error_message: { type: DataTypes.TEXT, require: false, allowNull: true },
//     },
//     { timestamp: false }
//   )
//   Step.belongsTo(Scenario)
//   return Step
// }

module.exports = class StepModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        testcase_step_title: DataTypes.STRING,
        testcase_step_status: DataTypes.STRING,
        error_message: {
          type: DataTypes.TEXT,
          require: false,
          allowNull: true,
        },
      },
      { timestamp: false, tableName: 'STEP', sequelize }
    )
  }
  static associate(models) {
    this.stepsScenarioAssociation = this.belongsTo(models.ScenarioModel)
  }
}
