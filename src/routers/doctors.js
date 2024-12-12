const express = require('express');
const router = express.Router();

const doctorController = require('../controller/doctors.js');

router.get('/all', doctorController.getAllDoctors);

module.exports = router;