const express = require('express');
const router = express.Router();

const userController = require('../controller/users.js');

router.get('/all', userController.getAllUsers);
router.post('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

// user signup
router.post('/signup', userController.createNewUser);
// user signin
router.post('/signin', userController.loginUser);

module.exports = router;