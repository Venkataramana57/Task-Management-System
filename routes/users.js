const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validateUser = require('../validations/user');

router.post('/register', validateUser, usersController.signup);
router.post('/login', usersController.login);

module.exports = router;
