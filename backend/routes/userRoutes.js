const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    updateProfile,
    changePassword
} = require('../controllers/userController');
const {protect} = require('../middleware/userAuthMiddleware');

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Profile routes
router.put('/profile', protect, updateProfile);
router.put('/change-password',protect ,changePassword)

module.exports = router;