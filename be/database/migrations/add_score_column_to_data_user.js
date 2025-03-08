'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('data_users', 'scoreHome', {
            type: Sequelize.STRING,
        }),
        await queryInterface.addColumn('data_users', 'scoreAway', {
            type: Sequelize.STRING,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('data_users', 'scoreHome'),
        await queryInterface.removeColumn('data_users', 'scoreAway');
    }
};