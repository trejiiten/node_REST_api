const sequelize = require('sequelize')
const Step = require('./step')
const Feature = require('./feature')

// module.exports = (sequelize, DataTypes) => {
//   const Scenario = sequelize.define('Scenario', {
//     testcase_title: DataTypes.STRING,
//     time_start: DataTypes.DATE,
//     time_end: DataTypes.DATE,
//   })
//   Scenario.hasMany(Step)
//   Scenario.belongsTo(Feature)
//   return Scenario
// }

module.exports = class ScenarioModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        testcase_title: DataTypes.STRING,
        time_start: DataTypes.DATE,
        time_end: DataTypes.DATE,
      },
      {
        tableName: 'SCENARIO',
        sequelize,
      }
    )
  }
  static associate(models) {
    this.scenariosFeatureAssociation = this.belongsTo(models.FeatureModel)
    this.scenarioStepsAssociation = this.hasMany(models.StepModel)
  }
}
