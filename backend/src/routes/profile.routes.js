const express = require('express');
const router = express.Router();
const { createProfile, getProfile } = require('../controllers/profile.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

router.post('/create', authMiddleware, createProfile);
router.get('/', authMiddleware, getProfile);

module.exports = router;
