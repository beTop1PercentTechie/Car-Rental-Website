const express = require('express');
const router = express.Router();
const { searchCars, getCarById, getCarImage } = require('../controllers/carController');

router.get('/', searchCars);
router.get('/image/:id', getCarImage);
router.get('/:id', getCarById);

module.exports = router;