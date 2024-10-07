const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path as necessary
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

async function hashAndSavePasswords() {
    try {
        const users = await User.find(); // Find all users
        for (let user of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);

            user.password = hashedPassword;
            await user.save();
            console.log(`Password for ${user.username} updated successfully`);
        }
        mongoose.connection.close();
    } catch (error) {
        console.error('Error while updating passwords:', error);
    }
}

hashAndSavePasswords();
