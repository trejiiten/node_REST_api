const sequelize = require('sequelize')
// const Scenario = require('./scenario')

// module.exports = (sequelize, DataTypes) => {
//   const Feature = sequelize.define('Feature', {
//     feature_file_title: { type: DataTypes.STRING, unique: true },
//     feature_file_type: DataTypes.STRING,
//     feature_file_location: DataTypes.STRING,
//     scenarios: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Scenario',
//       },
//     ],
//     total_tests: DataTypes.INTEGER,
//     total_time: DataTypes.INTEGER,
//   })
//   Feature.hasMany(Scenario)
//   return Feature
// }

module.exports = class FeatureModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        feature_file_title: { type: DataTypes.STRING, unique: true },
        feature_file_type: DataTypes.STRING,
        feature_file_location: DataTypes.STRING,
        scenarios: [
          {
            type: Schema.Types.ObjectId,
            ref: 'Scenario',
          },
        ],
        total_tests: DataTypes.INTEGER,
        total_time: DataTypes.INTEGER,
      },
      {
        tableName: 'FEATURE',
        sequelize,
      }
    )
  }
  static associate(models) {
    this.featureEnvironmentAssociation = this.belongsToMany(
      models.EnvironmentModel
    )
    this.featureScenariosAssociation = this.hasMany(models.ScenarioModel)
  }
}
