// models/hotel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define asylum seeker schema
const asylumSeekerSchema = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false } // false = Checked Out, true = Checked In
}, { timestamps: true });

const AsylumSeeker = mongoose.models.AsylumSeeker || mongoose.model('AsylumSeeker', asylumSeekerSchema);

// Define the room schema
const roomSchema = new Schema({
    roomNumber: { type: Number, required: true },
    asylumSeekers: [
        {
            type: Schema.Types.ObjectId, // Reference to AsylumSeeker
            ref: 'AsylumSeeker'
        }
    ],
    hotelId: { // Reference to the Hotel
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

// Define the floor schema
const floorSchema = new Schema({
    floorNumber: { type: Number, required: true },
    rooms: [
        {
            type: Schema.Types.ObjectId, // Reference to Room
            ref: 'Room'
        }
    ]
});

const Floor = mongoose.models.Floor || mongoose.model('Floor', floorSchema);

// Define the hotel schema
const hotelSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: { type: String, required: true },
    floors: [
        {
            type: Schema.Types.ObjectId, // Reference to Floor
            ref: 'Floor'
        }
    ]
}, { timestamps: true });

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);

module.exports = {
    AsylumSeeker,
    Room,
    Floor,
    Hotel
};
