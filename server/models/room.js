// models/room.js

const mongoose = require('mongoose');
delete mongoose.models.Room;


const { Schema } = mongoose;

const roomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    asylumSeekers: [{
        type: Schema.Types.ObjectId,
        ref: 'AsylumSeeker'
    }],
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

module.exports = Room;
