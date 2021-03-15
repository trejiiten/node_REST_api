'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',[{
        username: `${process.env.QA_USER}`,
        password: await ecryptSecret(process.env.QA_PASS),
        createdAt : new Date(),
        updatedAt : new Date(),
      }]
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};

async function ecryptSecret(secret) {
  const salt = await bcrypt.genSalt();
  const hashedPass = await bcrypt.hash(secret, salt);
  return hashedPass;
}