const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/adminAuthMiddleware');
const { registerAdmin, loginAdmin, getProfile, updateProfile, changePassword } = require('../controllers/adminController');

// Auth routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Profile Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);


module.exports = router;