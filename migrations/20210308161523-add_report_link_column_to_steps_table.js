"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Steps", "extent_report_link", {
      type: Sequelize.STRING,
      require: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Steps",
      "extent_report_link",
      Sequelize.STRING
    );
  },
};
