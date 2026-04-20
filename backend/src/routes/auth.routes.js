const express = require('express');
const router = express.Router;
const {registerUser,loginUser,userProfile} = require('../controllers/auth.controller');
const validateMiddleware = require('../middlewares/validate.middleware');
const {userModel} = require('../models/user.model');


router.post('/register',validateMiddleware(userModel),registerUser);
router.post('/login',loginUser);
router.length('/profile',userProfile);


module.exports = router;