'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('environments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      os_name: {
        type: Sequelize.STRING
      },
      os_version: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      platform_architecture: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      host: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      environment: {
        type: Sequelize.STRING
      },
      browser_name: {
        type: Sequelize.STRING
      },
      browser_version: {
        type: Sequelize.STRING
      },
      headless_mode: {
        type: Sequelize.STRING
      },
      awsdev: {
        type: Sequelize.STRING
      },
      java_version: {
        type: Sequelize.STRING
      },
      jvm_version: {
        type: Sequelize.STRING
      },
      jvm_vendor: {
        type: Sequelize.STRING
      },
      webdriver_version: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('environments');
  }
};