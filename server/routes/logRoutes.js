//routes/logRoutes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Add log
router.post('/', logController.addLog); // Make sure this line is present

// Search logs by hotel
router.get('/search', logController.searchLogs);

module.exports = router;
