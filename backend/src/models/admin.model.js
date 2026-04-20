const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');

const Admin = sequelize.define('Admins',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull :false,
        references : {
            model : User,
            key : 'id',
        }
    },
    fullName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    phone : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    department : {
        type : DataTypes.STRING,
        allowNull : true,
    }
},{
    freezeTableName: true,
    timestamps : true,
});

module.exports = Admin;
