const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig')

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true
});
  
sequelize.sync()
    .then(() => {
        console.log('User table has been created, if one doesn\'t exist');
    })
    .catch(error => {
        console.error('Unable to create table : ', error);
    });
  
module.exports = User;