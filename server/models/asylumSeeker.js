const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the asylum seeker schema
const asylumSeekerSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Create the asylum seeker model
const AsylumSeeker = mongoose.model('AsylumSeeker', asylumSeekerSchema);

module.exports = AsylumSeeker;
