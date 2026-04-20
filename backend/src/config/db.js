require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5000,
  database: process.env.DB_NAME || 'medisphere',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  logging: console.log === console.error ? false : console.log,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('All tables synced');
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
  }
};

module.exports = { sequelize, connectDB };

