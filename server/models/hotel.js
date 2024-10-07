const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define room schema
const roomSchema = new Schema({
    roomNumber: { type: Number, required: true }
});

// Define floor schema
const floorSchema = new Schema({
    floorNumber: { type: Number, required: true },
    rooms: [roomSchema]
});

// Define the hotel schema
const hotelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    floors: [floorSchema] // Embed floors with rooms in the hotel schema
}, { timestamps: true });

// Create the hotel model
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
