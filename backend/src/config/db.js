require('dotenv').config();
const{Sequelize} =require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
async function connectDB() {
    try {
        sequelize.authenticate();
        console.log("Database connected successfully");
        sequelize.sync({alter : true});
        console.log("All Table synced");
        
    } catch (error) {
        console.log("Databas connection Failed",error);
        
        
    }
    
}

module.exports = {sequelize,connectDB};