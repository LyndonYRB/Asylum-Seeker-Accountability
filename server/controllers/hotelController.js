const Hotel = require('../models/hotel');
const hotelSchema = require('../validators/hotelValidation');

// Get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        console.log('Fetched hotels:', hotels);
        res.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create a new hotel
exports.createHotel = async (req, res) => {
    const { name, floors } = req.body;

    // Validate the incoming data structure
    if (!name || !Array.isArray(floors)) {
        return res.status(400).json({ message: 'Invalid data structure. Please provide a valid hotel name and floors.' });
    }

    try {
        const newHotel = new Hotel({ name, floors });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(400).json({ message: error.message });
    }
};

// Get a specific hotel by ID
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    const { name, floors } = req.body;

    if (!name || !Array.isArray(floors)) {
        return res.status(400).json({ message: 'Invalid data structure. Please provide a valid hotel name and floors.' });
    }

    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.json({ message: 'Hotel deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
