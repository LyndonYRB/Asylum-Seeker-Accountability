// roomController.js
const Room = require('../models/room'); // Ensure you're importing the Room model correctly
const Hotel = require('../models/hotel'); // Import the Hotel model

// Get all rooms
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('asylumSeekers'); // Populate asylum seekers if needed
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new room
const createRoom = async (req, res) => {
    const { roomNumber, hotelId } = req.body;

    // Validate input
    if (!roomNumber || !hotelId) {
        return res.status(400).json({ message: 'Room number and hotel ID are required.' });
    }

    try {
        const newRoom = new Room({
            roomNumber,
            asylumSeekers: [], // Initialize as empty array
            hotelId // Reference to the hotel
        });
        await newRoom.save();
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a specific room by ID
const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id)
            .populate('asylumSeekers') // Populate asylum seekers if needed
            .populate({
                path: 'hotelId', // Populate the hotelId field
                select: 'name' // Select only the hotel name
            });
        
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Return room details along with hotel name
        res.json({
            roomNumber: room.roomNumber,
            hotelName: room.hotelId.name, // Access hotel name
            asylumSeekers: room.asylumSeekers
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Update a room
const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a room
const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Correctly export all functions
module.exports = {
    getAllRooms,
    createRoom,
    getRoomById,
    updateRoom,
    deleteRoom
};
