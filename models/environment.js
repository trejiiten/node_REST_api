const Sequelize = require('sequelize')
// module.exports = (sequelize, DataTypes) => {
//   const Environment = sequelize.define("Environment", {
// os_name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// os_version: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// branch: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// platform_architecture: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// user: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// host: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// address: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// environment: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// browser_name: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// browser_version: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// headless_mode: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// awsdev: {
//   type: DataTypes.STRING,
//   allowNull: true,
// },
// java_version: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// jvm_version: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// jvm_vendor: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
// webdriver_version: {
//   type: DataTypes.STRING,
//   allowNull: false,
// },
//   });
//   return Environment;
// };

module.exports = class EnvironmentModel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        os_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        os_version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        branch: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        platform_architecture: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        host: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        environment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        browser_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        browser_version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        headless_mode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        awsdev: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        java_version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        jvm_version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        jvm_vendor: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        webdriver_version: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: 'ENVIRONMENT',
        sequelize,
      }
    )
  }
  static associate(models) {
    this.environmentFeatureAssociation = this.belongsToMany(models.FeatureModel)
  }
}
