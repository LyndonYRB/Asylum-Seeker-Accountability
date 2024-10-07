const AsylumSeeker = require('../models/asylumSeeker');

// Create a new asylum seeker
exports.createAsylumSeeker = async (req, res) => {
    const { fullName, age, room, checkedIn } = req.body;
    try {
        const newAsylumSeeker = new AsylumSeeker({ fullName, age, room, checkedIn });
        await newAsylumSeeker.save();
        res.status(201).json(newAsylumSeeker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all asylum seekers
exports.getAllAsylumSeekers = async (req, res) => {
    try {
        const asylumSeekers = await AsylumSeeker.find().populate('room');
        res.json(asylumSeekers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific asylum seeker by ID
exports.getAsylumSeekerById = async (req, res) => {
    try {
        const asylumSeeker = await AsylumSeeker.findById(req.params.id).populate('room');
        if (!asylumSeeker) return res.status(404).json({ message: 'Asylum seeker not found' });
        res.json(asylumSeeker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an asylum seeker
exports.updateAsylumSeeker = async (req, res) => {
    try {
        const updatedAsylumSeeker = await AsylumSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAsylumSeeker) return res.status(404).json({ message: 'Asylum seeker not found' });
        res.json(updatedAsylumSeeker);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an asylum seeker
exports.deleteAsylumSeeker = async (req, res) => {
    try {
        const deletedAsylumSeeker = await AsylumSeeker.findByIdAndDelete(req.params.id);
        if (!deletedAsylumSeeker) return res.status(404).json({ message: 'Asylum seeker not found' });
        res.json({ message: 'Asylum seeker deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check out an asylum seeker
exports.checkOut = async (req, res) => {
    try {
        const asylumSeeker = await AsylumSeeker.findById(req.params.id);
        if (!asylumSeeker) {
            return res.status(404).json({ message: 'Asylum seeker not found' });
        }

        // Set checkedIn to false for check-out
        asylumSeeker.checkedIn = false;
        await asylumSeeker.save();
        
        res.json({ message: 'Asylum seeker checked out successfully', asylumSeeker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check in an asylum seeker
exports.checkIn = async (req, res) => {
    try {
        const asylumSeeker = await AsylumSeeker.findById(req.params.id);
        if (!asylumSeeker) {
            return res.status(404).json({ message: 'Asylum seeker not found' });
        }

        // Set checkedIn to true for check-in
        asylumSeeker.checkedIn = true;
        await asylumSeeker.save();

        res.json({ message: 'Asylum seeker checked in successfully', asylumSeeker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};