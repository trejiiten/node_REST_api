"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Environment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.environmentFeatureAssociation = this.belongsToMany(models.Feature, {
        through:"environment_feature",
        uniqueKey:false,
        onDelete: "CASCADE",
        timestamps:false,
        foreignKey: {
          name:"environment_id",
        },as:"features"
      });
    }

  }
  Environment.init(
    {
      os_name: {
        type: DataTypes.STRING,
      },
      os_version: {
        type: DataTypes.STRING,
      },
      branch: {
        type: DataTypes.STRING,
      },
      platform_architecture: {
        type: DataTypes.STRING,
      },
      user: {
        type: DataTypes.STRING,
      },
      host: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        unique:true,
      },
      environment: {
        type: DataTypes.STRING,
      },
      browser_name: {
        type: DataTypes.STRING,
      },
      browser_version: {
        type: DataTypes.STRING,
      },
      headless_mode: {
        type: DataTypes.STRING,
      },
      awsdev: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      java_version: {
        type: DataTypes.STRING,
      },
      jvm_version: {
        type: DataTypes.STRING,
      },
      jvm_vendor: {
        type: DataTypes.STRING,
      },
      web_driver_version: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Environment",
      tableName: "environment",
    }
  );
  return Environment;
};
