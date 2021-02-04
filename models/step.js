"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Step extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.stepsScenarioAssociation = this.belongsTo(models.Scenario, {
        onDelete: "CASCADE",
        // foreignKey: {
        //   allowNull: false,
        // }
      });
    }
  }
  Step.init(
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      testcase_step_title: DataTypes.TEXT,
      testcase_step_status: DataTypes.STRING,
      error_message: {
        type: DataTypes.TEXT,
        require: false,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Step",
      tableName: "step",
    }
  );
  return Step;
};
