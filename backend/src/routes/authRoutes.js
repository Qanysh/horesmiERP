const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

// Register a new user
router.post('/login', loginController.loginUser);
router.post('/signup', registerController.registerUser);

module.exports = router;