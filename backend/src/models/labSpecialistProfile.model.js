const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');


const LabSpecialist = sequelize.define('LabSpecialist',{
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
    },
     userId : {
        type : DataTypes.STRING,
        allowNull :false,
        references : {
            model : User,
            id : id,
        }

    },
    bmdcNo : {
        type : DataTypes.STRING,
        allowNull : false
    },
    Specialization : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    nidNuber : {
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
},
 {
        freezeTableName: true,
        timestamps : true,
    }

);

module.exports = LabSpecialist;