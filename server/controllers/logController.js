//controllers/logController.js
const Log = require('../models/log');
const Room = require('../models/room'); // Make sure Room is imported
const AsylumSeeker = require('../models/asylumSeeker'); // Ensure AsylumSeeker is imported


exports.searchLogs = async (req, res) => {
    const { roomNumber, asylumSeekerName, performedBy, keyword, startDate, endDate, hotelId } = req.query;
    
    let searchQuery = {}; // Start with an empty query

    // If hotelId is provided, only fetch logs for the specified hotel
    if (hotelId) {
        searchQuery.hotel = hotelId;
    }

    // Add room number to search query if provided
    if (roomNumber) {
        const room = await Room.findOne({ roomNumber });
        if (room) {
            searchQuery.room = room._id;
        }
    }

    // Add asylum seeker's name to search query if provided
    if (asylumSeekerName) {
        const asylumSeeker = await AsylumSeeker.findOne({ fullName: { $regex: asylumSeekerName, $options: 'i' } });
        if (asylumSeeker) {
            searchQuery.asylumSeeker = asylumSeeker._id;
        }
    }

    // Add performedBy to search query if provided
    if (performedBy) {
        searchQuery.performedBy = { $regex: performedBy, $options: 'i' };
    }

    // Add keyword to search description if provided
    if (keyword) {
        searchQuery.description = { $regex: keyword, $options: 'i' };
    }

    // Add date range to search query if provided
    if (startDate || endDate) {
        searchQuery.createdAt = {};
        if (startDate) {
            searchQuery.createdAt.$gte = new Date(startDate);
        }
        if (endDate) {
            searchQuery.createdAt.$lte = new Date(endDate);
        }
    }

    try {
        // Find logs based on the constructed search query (empty query means "all logs")
        const logs = await Log.find(searchQuery)
            .populate('asylumSeeker', 'fullName')
            .populate('room', 'roomNumber')
            .populate('hotel', 'name') // Populate the hotel name
            .exec();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addLog = async (req, res) => {
    const { action, asylumSeeker, description, performedBy, room, hotel } = req.body;

    const log = new Log({
        action,
        asylumSeeker,
        description,
        performedBy,
        room,
        hotel,
    });

    try {
        const savedLog = await log.save();
        res.status(201).json({ message: "Log created successfully", log: savedLog });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.addLog = async (req, res) => {
    const { action, asylumSeeker, description, performedBy, room, hotel } = req.body;

    // Debugging: Check the IDs
    console.log("Asylum Seeker ID:", asylumSeeker);
    console.log("Room ID:", room);
    
    // Check if asylum seeker exists
    const asylumSeekerExists = await AsylumSeeker.findById(asylumSeeker);
    if (!asylumSeekerExists) {
        return res.status(400).json({ message: "Invalid asylum seeker ID" });
    }

    // Check if room exists
    const roomExists = await Room.findById(room);
    if (!roomExists) {
        return res.status(400).json({ message: "Invalid room ID" });
    }

    const log = new Log({
        action,
        asylumSeeker,
        description,
        performedBy,
        room,
        hotel,
    });

    try {
        const savedLog = await log.save();
        res.status(201).json({ message: "Log created successfully", log: savedLog });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
