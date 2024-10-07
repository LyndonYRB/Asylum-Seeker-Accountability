const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

async function rehashPasswords() {
    try {
        const users = await User.find();

        for (const user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            await user.save();
            console.log(`Password for ${user.username} rehashed successfully`);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error rehashing passwords:', error);
    }
}

rehashPasswords();
