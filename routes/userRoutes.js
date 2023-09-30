// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.renderRegisterPage);
router.post('/register', userController.registerUser);
router.get('/login', userController.renderLoginPage);
router.post('/login', userController.login);

module.exports = router;
