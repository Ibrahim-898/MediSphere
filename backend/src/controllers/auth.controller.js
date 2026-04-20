const authService = require('../services/auth.service');


async function registerUser(req,res) {
    try{
    const {email ,password,role} = req.body;
    const result =await authService.registerService(email,password,role);
    if(!result){
       return res.status(400).json({message : "Please Try again"});
    }
    return res.status(201).json({message : "User Created Successfully"});
    
    }
    catch(error){
       return res.status(500).json({message : error.message})
    } 
}
async function  loginUser(req,res) {
    try{
    const {email,password} = req.body;
    const result = await authService.loginService(email,password);
    if(!result){
       return res.status(400).json({message : "Email or Password is Wrong"});
    }
        return response.status(200).json({message : "Login Successfull"});
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
    
}


async function userProfile(req,res) {
    try{
    const userId = req.user.id;
    const result = await authService.userProfileService(userId,req.body);
    if(!result){
        return res.status(400).json({message : "Something Went Wrong! Try Again"});
    }
        return res.status(200).json("Profile Saved Successfully");
    }
    catch(error){
       return res.status(500).json({message : error.message});
    }
    
}

async function doctorProfile(req,res) {
    try{
    const userId = req.user.id;
    const result = await authService.doctorProfileService(userId);
    if(!result){
        return res.status(400).json({message : "Something Went Wrong! Try Again"});
    }
        return res.status(200).json("Profile Saved Successfully");
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
    
}

async function labSpecialistProfile(req,res) {
    try{
    const result = await labSpecialistProfileService(userId);
    if(!result){
        return res.status(400).json({message : "Something Went Wrong! Try Again"});
    }
        return res.status(200).json("Profile Saved Successfully");
    }
    catch(error){
        return res.status(500).json({message : error.message});
    }
    
}

module.exports = {registerUser,loginUser,userProfile};