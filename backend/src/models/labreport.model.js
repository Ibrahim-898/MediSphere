const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');
const LabTest = require('./labtest.model');

const LabReport = sequelize.define('LabReports', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    testId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : LabTest,
            key : 'id',
        }
    },
    labId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : User,
            key : 'id',
        }
    },
    results : {
        type : DataTypes.JSON,
        allowNull : false,
    },
    reportDate : {
        type : DataTypes.DATE,
        allowNull : false,
    },
    fileUrl : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    conclusion : {
        type : DataTypes.TEXT,
    }
}, {
    freezeTableName : true,
    timestamps : true,
});

module.exports = LabReport;
