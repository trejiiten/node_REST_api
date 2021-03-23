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
      });
    }
  }
  Step.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      testcase_step_title: DataTypes.TEXT,
      testcase_step_status: DataTypes.STRING,
      error_message: {
        type: DataTypes.TEXT,
        require: false,
        allowNull: true,
      },
      /** 
       * The following column was added through migration.
       * see: migrations/20210308161523-add_report_link_column_to_steps_table 
       * code:
       * 
       */
      //  extent_report_link: {
      //  type: DataTypes.STRING,
      // },
      
      /** 
       * The following column was added through migration.
       * see: migrations/20210322150314-add_environment_to_steps_model_with_fk_pointing_to_environment_model 
       * code:
       * 
       */
      //  testcase_step_environment: {
      //      type: DataTypes.STRING,
      //  },
      
    },
    {
      sequelize,
      modelName: "Step",
      tableName: "steps",
    }
  );
  return Step;
};
