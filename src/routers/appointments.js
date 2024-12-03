const express = require('express');
const router = express.Router();

const apointmentsController = require('../controller/appointments.js');

router.get('/all', apointmentsController.getAllApointments);
router.post('/create', apointmentsController.createNewApointments);
router.patch('/update/:id', apointmentsController.updateApointments);
router.delete('/delete/:id', apointmentsController.deleteApointments);

module.exports = router;