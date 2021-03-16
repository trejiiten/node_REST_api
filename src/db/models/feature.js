"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.environmentFeatureAssociation = this.belongsToMany(
        models.Environment,
        {
          through: "environment_features",
          uniqueKey: false,
          onDelete: "CASCADE",
          timestamps: false,
          foreignKey: {
            name: "feature_id",
            allowNull: false,
          },
        }
      );
      this.featureScenariosAssociation = this.hasMany(models.Scenario, {
        onDelete: "CASCADE",
        foreignKey: {
          field: "featureId",
          allowNull: false,
        }, as:"scenarios"
      });
    }

  }
  Feature.init(
    {
      feature_file_title: { type: DataTypes.STRING, unique: true },
      feature_file_type: DataTypes.STRING,
      feature_file_location: DataTypes.STRING,
      total_tests: DataTypes.INTEGER,
      total_steps: DataTypes.INTEGER,
      time_start: DataTypes.STRING,
      time_end: DataTypes.STRING,
      total_time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Feature",
      tableName: "features",
    }
  );
  return Feature;
};
