"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Scenario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.scenariosFeatureAssociation = this.belongsTo(models.Feature, {
        onDelete: "CASCADE",
        // foreignKey: {
          
        //   allowNull: false,
        // }
      });
      this.scenarioStepsAssociation = this.hasMany(models.Step, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "scenarioId",
          allowNull: false,
        }, as: "testcase_steps"
      });
    }

  }
  Scenario.init(
    {
      testcase_title: DataTypes.TEXT,
      time_start: DataTypes.STRING,
      time_end: DataTypes.STRING,
      total_time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Scenario",
      tableName:"scenarios",
    }
  );
  return Scenario;
};
