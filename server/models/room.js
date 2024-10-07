const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the room schema
const roomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
}, { timestamps: true });

// Create the room model
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
