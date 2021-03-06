'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('steps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      testcase_step_title: {
        type: Sequelize.STRING
      },
      testcase_step_status: {
        type: Sequelize.STRING
      },
      error_message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      scenarioId:{
        type: Sequelize.INTEGER,
        references:{model:'Scenarios', key:'id'},
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('steps');
  }
};