'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('environment_features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      environment_id: {
        type: Sequelize.INTEGER,
        references:{model:'Environments', key:'id'},
      },
      feature_id: {
        type: Sequelize.INTEGER,
        references:{model:'Features', key:'id'},
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
    await queryInterface.dropTable('environment_features');
  }
};