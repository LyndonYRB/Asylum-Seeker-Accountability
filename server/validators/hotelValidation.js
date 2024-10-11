const Joi = require('joi');

// Define the hotel validation schema
const hotelSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(5).max(100).required(),
    rooms: Joi.array().items(
        Joi.object({
            roomNumber: Joi.number().integer().min(1).required()
        })
    ).required()
});

module.exports = hotelSchema;
