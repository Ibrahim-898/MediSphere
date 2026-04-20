const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');

const LabTest = sequelize.define('LabTests', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    patientId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : User,
            key : 'id',
        }
    },
    doctorId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : User,
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
    testType : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    sampleCollected : {
        type : DataTypes.DATE,
        allowNull : true,
    },
    status : {
        type : DataTypes.ENUM('ordered', 'sample_collected', 'testing', 'completed', 'cancelled'),
        defaultValue : 'ordered',
    },
    notes : {
        type : DataTypes.TEXT,
    },
    reportId : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : 'LabReports',
            key : 'id',
        }
    }
}, {
    freezeTableName: true,
    timestamps : true,
});

module.exports = LabTest;
