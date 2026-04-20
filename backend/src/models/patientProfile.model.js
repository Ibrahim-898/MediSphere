const {DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');

const Patient = sequelize.define('Patients',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    fullName : {
        type : DataTypes.STRING,
        allowNull : false,
    },
     userId : {
        type : DataTypes.STRING,
        allowNull :false,
        references : {
            model : User,
            id : id,
        }

    },
   
    phone : {
        type : DataTypes.STRING,
        allowNull : false,
        len : [11,14],
    },
    occupation : {
        type : DataTypes.STRING,
    },
    maritalStatus : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    sex : {
        type : DataTypes.ENUM("Male","Female"),
        allowNull : false,
    },
    nidNumber :{
        type : DataTypes.STRING,
        allowNull : false,
        unique: true,
    },
    dateOfBirth : {
        type : DataTypes.DATEONLY,
        allowNull : false,
    }
    } ,
    {
        freezeTableName: true,
        timestamps : true,
    }
);

module.exports = Patient;

