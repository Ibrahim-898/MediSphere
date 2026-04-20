const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');

const User = sequelize.define('Users',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate :{
            isEmail : true,
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,

    },
    role : {
        type : DataTypes.ENUM("Patient","Doctor","Lab Specialist"),
        allowNull : false
    }
    
    } ,
    {
        freezeTableName: true,
        timestamps : true,
    }
);

module.exports = User;

