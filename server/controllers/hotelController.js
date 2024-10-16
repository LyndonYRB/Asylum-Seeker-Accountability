// server/controllers/hotelController.js
const { Hotel } = require('../models/hotel');


// Get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate({
            path: 'floors',
            populate: { path: 'rooms', populate: { path: 'asylumSeekers' } }
        });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new hotel with floors
exports.createHotel = async (req, res) => {
    const { name, floors } = req.body;

    // Validate the incoming data structure
    if (!name || !Array.isArray(floors)) {
        return res.status(400).json({ message: 'Invalid data structure. Please provide a valid hotel name and floors.' });
    }

    try {
        // Create and save floors
        const floorDocuments = await Floor.insertMany(floors.map(floor => ({
            floorNumber: floor.floorNumber,
            rooms: floor.rooms
        })));

        // Create the hotel with the saved floor IDs
        const newHotel = new Hotel({ name, floors: floorDocuments.map(floor => floor._id) });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get a specific hotel by ID
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id).populate({
            path: 'floors',
            populate: {
                path: 'rooms',
                populate: { path: 'asylumSeekers' }
            }
        });
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

// Get floors for a specific hotel
exports.getFloors = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId).populate('floors');
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json(hotel.floors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get rooms for a specific floor in a hotel
exports.getRoomsForFloor = async (req, res) => {
    try {
        const { hotelId, floorNumber } = req.params;
        const hotel = await Hotel.findById(hotelId).populate('floors');

        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        console.log('Hotel:', hotel);
        console.log('Floors:', hotel.floors); // Check if floors is defined

        // Ensure that the floors array exists and find the specific floor
        if (!Array.isArray(hotel.floors)) {
            return res.status(404).json({ message: 'No floors found for this hotel.' });
        }

        const floor = hotel.floors.find(floor => floor.floorNumber === parseInt(floorNumber));
        if (!floor) return res.status(404).json({ message: 'Floor not found' });

        res.status(200).json(floor.rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: error.message });
    }
};




// Get asylum seekers for a specific room in a floor
exports.getAsylumSeekersInRoom = async (req, res) => {
    try {
        const { hotelId, floorNumber, roomNumber } = req.params;
        const hotel = await Hotel.findById(hotelId).populate('floors.rooms.asylumSeekers');
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        const floor = hotel.floors.find(floor => floor.floorNumber === parseInt(floorNumber));
        if (!floor) return res.status(404).json({ message: 'Floor not found' });

        const room = floor.rooms.find(room => room.roomNumber === parseInt(roomNumber));
        if (!room) return res.status(404).json({ message: 'Room not found' });

        res.status(200).json(room.asylumSeekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add an asylum seeker to a specific room in a hotel
exports.addAsylumSeekerToRoom = async (req, res) => {
    try {
        const { hotelId, floorNumber, roomNumber } = req.params;
        const { name, status } = req.body;
        
        const hotel = await Hotel.findById(hotelId).populate('floors.rooms');
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });

        const floor = hotel.floors.find(floor => floor.floorNumber === parseInt(floorNumber));
        if (!floor) return res.status(404).json({ message: 'Floor not found' });

        const room = floor.rooms.find(room => room.roomNumber === parseInt(roomNumber));
        if (!room) return res.status(404).json({ message: 'Room not found' });

        // Create new asylum seeker
        const newAsylumSeeker = await AsylumSeeker.create({ name, status });

        // Add the asylum seeker to the room's asylumSeekers array
        room.asylumSeekers.push(newAsylumSeeker._id);

        // Save the updated hotel document
        await hotel.save();

        res.status(201).json(newAsylumSeeker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
