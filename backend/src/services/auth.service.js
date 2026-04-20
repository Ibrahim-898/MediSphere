
const {userModel} = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {patientProfileModel} = require('../models/patientProfile.model');
const {doctorProfileModel} = require('../models/doctorsProfile.model');
const {labSpecialistProfileModel} =require('../models/labSpecialistProfile.model');



async function registerService(email,password,role) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const user = await userModel.create({
        email : email,
        password :hashedPassword,
        role : role,   
    });
    return user;
    
}

async function loginService(email,password) {
    const user = userModel.findOne({where : email});
    if(!user){
        throw new Error ("Email or Password is Wrong");
    }
    const isValid = bcrypt.compare(password,user.password);
    if(!isValid){
         throw new Error ("Email or Password is Wrong");
    }

    const token = jwt.sign({
        email : email,
        id : user.id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    
    );


    return {
        user,token
    };  
}
async function  patientProfileService(userId,data) {
    const profile = await patientProfileModel.create({
        userId : userId,
        fullName : data.fullName,
        bmdcNo : data.bmdcNo,
        nidNumber : data.nidNumber,
        sex : data.sex,
        dateOfBirth : data.dateOfBirth,
        degree : data.degree,
        sppecialization :data.sppecialization,

    });
    
}


module.exports = {registerService,loginService}