'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('data_users', 'winnerByOdd', {
            type: Sequelize.ENUM('Home', 'Away', 'Draw'),
            allowNull: true
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('data_users', 'winnerByOdd', {
            type: Sequelize.STRING,
            allowNull: true
        });
    }
};