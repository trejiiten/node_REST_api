'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      feature_file_title: {
        type: Sequelize.STRING
      },
      feature_file_type: {
        type: Sequelize.STRING
      },
      feature_file_location: {
        type: Sequelize.STRING
      },
      total_scenarios: {
        type: Sequelize.INTEGER
      },
      total_steps: {
        type: Sequelize.INTEGER
      },
      time_start: {
        type: Sequelize.STRING
      },
      time_end: {
        type: Sequelize.STRING
      },
      total_time: {
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
    await queryInterface.dropTable('features');
  }
};