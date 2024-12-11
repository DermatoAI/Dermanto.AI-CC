const express = require('express');
const router = express.Router();

const appointmentsController = require('../controller/appointments.js');

router.get('/all', appointmentsController.getAllAppointments);
router.post('/create', appointmentsController.createNewAppointments);
router.get('/history/:id', appointmentsController.getHistoryUser);
router.get('/current/:id', appointmentsController.getcurrentUser);
router.post('/update/:id', appointmentsController.updateAppointments);
router.delete('/delete/:id', appointmentsController.deleteAppointments);

module.exports = router;