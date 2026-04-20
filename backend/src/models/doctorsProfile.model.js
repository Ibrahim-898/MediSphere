const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');


const Doctors = sequelize.define('Doctors',{
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull :false,
        references : {
            model : User,
            key : 'id',
        }

    },
    fullName :{
        type : DataTypes.STRING,
        allowNull : false,

    },
    bmdcNo : {
        type : DataTypes.STRING,
        allowNull : false
    },
    Specialization : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nidNumber : {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    sex : {
        type : DataTypes.ENUM("Male","Female"),
        allowNull : false,
    },
     dateOfBirth : {
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    profilePhoto : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    degree : {
        type : DataTypes.STRING,
        allowNull : false,
    }
},
 {
        freezeTableName: true,
        timestamps : true,
    }

);

module.exports = Doctors;