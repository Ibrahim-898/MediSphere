const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');
const Appointment = require('./appointment.model');

const Prescription = sequelize.define('Prescriptions', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    appointmentId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : Appointment,
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
    patientId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model : User,
            key : 'id',
        }
    },
    medications : {
        type : DataTypes.JSON,
        allowNull : false,
    },
    instructions : {
        type : DataTypes.TEXT,
    },
    dosage : {
        type : DataTypes.TEXT,
    }
}, {
    freezeTableName: true,
    timestamps : true,
});

module.exports = Prescription;
