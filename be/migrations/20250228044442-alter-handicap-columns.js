'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('data_users', 'handicapHome', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
    await queryInterface.changeColumn('data_users', 'handicapAway', {
      type: Sequelize.FLOAT,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('data_users', 'handicapHome', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('data_users', 'handicapAway', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};