const {sequelize} = require('../config/db');
const {DataTypes} = require('sequelize');
const User = require('./user.model');

const Appointment = sequelize.define('Appointments', {
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
    date : {
        type : DataTypes.DATEONLY,
        allowNull : false,
    },
    time : {
        type : DataTypes.TIME,
        allowNull : false,
    },
    status : {
        type : DataTypes.ENUM('booked', 'confirmed', 'completed', 'cancelled'),
        defaultValue : 'booked',
    },
    notes : {
        type : DataTypes.TEXT,
    }
}, {
    freezeTableName: true,
    timestamps : true,
});

module.exports = Appointment;
