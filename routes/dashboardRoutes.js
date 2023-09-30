// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', isAuthenticated, dashboardController.renderDashboardPage);
router.get('/logout', dashboardController.logout);

module.exports = router;
