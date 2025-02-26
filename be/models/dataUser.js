const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig');
const User = require('./user');

const DataUser = sequelize.define('DataUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: User,
        key: 'id'
        }
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    league: {
        type: DataTypes.STRING,
        allowNull: false
    },
    home:{
        type: DataTypes.STRING,
        allowNull: false
    },
    away:{
        type: DataTypes.STRING,
        allowNull: false
    },
    handicapHome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    handicapAway:{
        type: DataTypes.STRING,
        allowNull: false
    },
    oddHome1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    oddAway1: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    oddHome2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    oddAway2: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalVotesHome: {
        type: DataTypes.INTEGER
    },
    totalVotesDraw: {
        type: DataTypes.INTEGER
    },
    totalVotesAway: {
        type: DataTypes.INTEGER
    },
    winnerByOdd: {
        type: DataTypes.ENUM('Home', 'Away', 'Draw')
    },
    note: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    scoreHome: {
        type: DataTypes.STRING
    },
    scoreAway: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'data_users',
    timestamps: true
});

User.hasMany(DataUser, { foreignKey: 'userId' });
DataUser.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync()
    .then(() => {
        console.log('DataUser table has been created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });

module.exports = DataUser;