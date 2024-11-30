const express = require('express');
const router = express.Router();

const userController = require('../controller/users.js');

// router.patch('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

// user signup
router.post('/signup', userController.createNewUser);
// user signin
router.post('/signin', userController.loginUser);

module.exports = router;