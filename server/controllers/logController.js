exports.searchLogs = async (req, res) => {
    const { roomNumber, asylumSeekerName, performedBy, keyword, startDate, endDate, hotelId } = req.query;
    
    let searchQuery = { hotel: hotelId }; // Only fetch logs for the specified hotel

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
