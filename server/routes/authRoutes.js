const express = require('express');
const { createUser, login } = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', createUser);

// Login a user
router.post('/login', login);

module.exports = router;
