const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the log schema
const logSchema = new Schema({
    action: { type: String, required: true },
    asylumSeeker: { type: Schema.Types.ObjectId, ref: 'AsylumSeeker', required: true },
    description: { type: String, required: true },
    performedBy: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true }, // New field to reference the hotel
}, { timestamps: true });

// Create the log model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
