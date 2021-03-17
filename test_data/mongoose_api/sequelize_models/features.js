'use strict';

const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class FeatureModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        feature_file_title: { type: DataTypes.STRING },
        feature_file_type: { type: DataTypes.STRING },
        feature_file_location: { type: DataTypes.STRING },
        scenarios: [
          {
            type: Schema.Types.ObjectId,
            ref: "SCENARIO",
          },
        ],
        total_scenarios: { type: DataTypes.INTEGER },
        total_steps: { type: DataTypes.INTEGER },
        time_start: { type: DataTypes.STRING },
        time_end: { type: DataTypes.STRING },
        total_time: { type: DataTypes.STRING },
      },
      {
        tableName: "FEATURE",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.featureEnvironmentAssociation = this.belongsToMany(
      models.EnvironmentModel,
      {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false,
        },
      }
    );
    this.featureScenariosAssociation = this.hasMany(models.ScenarioModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  }
};
