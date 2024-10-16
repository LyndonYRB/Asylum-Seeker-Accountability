// server/routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Get all hotels
router.get('/', hotelController.getAllHotels);

// Create a new hotel
router.post('/', hotelController.createHotel);

// Get a specific hotel by ID
router.get('/:id', hotelController.getHotelById);

// Update a hotel
router.put('/:id', hotelController.updateHotel);

// Delete a hotel
router.delete('/:id', hotelController.deleteHotel);

// Get floors for a specific hotel
router.get('/:hotelId/floors', hotelController.getFloors);

// Get rooms for a specific floor in a hotel
router.get('/:hotelId/floors/:floorNumber/rooms', hotelController.getRoomsForFloor);

module.exports = router;
