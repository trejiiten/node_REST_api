'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('steps', 'testcase_step_environment', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'steps',
      'testcase_step_environment',
      Sequelize.STRING
    );
  },
};
