const express = require('express');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login
} = require('../controllers/userController');

const router = express.Router();

// User routes
router.get('/', getAllUsers);          // Get all users
router.post('/', createUser);          // Create a new user
router.get('/:id', getUserById);       // Get a user by ID
router.put('/:id', updateUser);        // Update a user by ID
router.delete('/:id', deleteUser);     // Delete a user by ID
router.post('/login', login);          // User login route

module.exports = router;
