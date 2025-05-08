const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/adminAuthMiddleware');
const { registerAdmin, loginAdmin, getProfile, updateProfile, changePassword } = require('../controllers/adminController');
const { addCar } = require('../controllers/carController');
const upload = require('../utils/multer');


// Auth routes
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Profile Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

// Car route
router.post('/car', protect, upload.single('image') ,addCar)



module.exports = router;