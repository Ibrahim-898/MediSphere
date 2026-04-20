const  express = require('express');
const app = require('./src/app');
const {connectDB} = require('./src/config/db');

connectDB();

app.listen(8000 ,()=>{
    console.log("server is running at port 8000");
});
