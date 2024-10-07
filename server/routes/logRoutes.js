const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// Search logs by hotel
router.get('/search', logController.searchLogs);

module.exports = router;
