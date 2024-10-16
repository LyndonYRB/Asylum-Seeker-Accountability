//modol/asylumSeeker.js
const mongoose = require('mongoose');

delete mongoose.models.AsylumSeeker;



const { Schema } = mongoose;

const asylumSeekerSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    room: {  // Reference to Room model
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    checkedIn: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const AsylumSeeker = mongoose.models.AsylumSeeker || mongoose.model('AsylumSeeker', asylumSeekerSchema);

module.exports = AsylumSeeker;
