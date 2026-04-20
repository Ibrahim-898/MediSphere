const express = require('express');
const router = express.Router();
const {registerUser,loginUser,userProfile} = require('../controllers/auth.controller');
const validateMiddleware = require('../middlewares/validate.middleware');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { registerSchema } = require('../validations/userValidation');

router.post('/register', validateMiddleware(registerSchema), registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, userProfile);

module.exports = router;
