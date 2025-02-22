const { Sequelize } = require('sequelize');

const sequelize = new Sequelize ('predicapp', 'root', '', {
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize