'use strict';

const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class ScenarioModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        testcase_title: { type: DataTypes.STRING },
        testcase_steps: [
          {
            type: Schema.Types.ObjectId,
            ref: "STEP",
          },
        ],
        time_start: { type: DataTypes.STRING },
        time_end: { type: DataTypes.STRING },
        total_time: { type: DataTypes.STRING },
      },
      {
        tableName: "SCENARIO",
        sequelize,
      }
    );
  }
  static associate(models) {
    this.scenariosFeatureAssociation = this.belongsTo(models.FeatureModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
    this.scenarioStepsAssociation = this.hasMany(models.StepModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  }
};
