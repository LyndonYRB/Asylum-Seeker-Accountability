//routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAllRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
} = require('../controllers/roomController');

// Room routes
router.get('/', getAllRooms);          // Get all rooms
router.post('/', createRoom);          // Create a new room
router.get('/:id', getRoomById);       // Get a room by ID
router.put('/:id', updateRoom);        // Update a room by ID
router.delete('/:id', deleteRoom);     // Delete a room by ID

module.exports = router;
