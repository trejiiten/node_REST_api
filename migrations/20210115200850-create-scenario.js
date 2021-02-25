'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scenarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      testcase_title: {
        type: Sequelize.STRING
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
      },
      featureId:{
        type: Sequelize.INTEGER,
        references:{model:'Features', key:'id'},
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scenarios');
  }
};