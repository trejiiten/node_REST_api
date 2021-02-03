'use strict';

const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = class StepModel extends Model {
  static init(sequelize) {
    return super.init(
      {
        testcase_step_title: { type: DataTypes.STRING },
        testcase_step_status: { type: DataTypes.STRING },
        error_message: {
          type: DataTypes.TEXT,
          require: false,
          allowNull: true,
        },
      },
      {
        tableName: "STEP",
        timestamp: false,
        sequelize,
      }
    );
  }
  static associate(models) {
    this.stepsScenarioAssociation = this.belongsTo(models.ScenarioModel, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false,
      },
    });
  }
};
