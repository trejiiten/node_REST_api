"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("steps", "extent_report_link", {
      type: Sequelize.STRING,
      require: false,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "steps",
      "extent_report_link",
      Sequelize.STRING
    );
  },
};
