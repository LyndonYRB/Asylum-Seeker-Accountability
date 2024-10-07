const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust path as necessary
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('MongoDB connection error:', error));

async function hashAndSavePassword() {
    try {
        const user = await User.findOne({ username: 'adminuser' });

        if (!user) {
            console.log('User not found');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        user.password = hashedPassword;
        await user.save();

        console.log('Password updated successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error(error);
    }
}

hashAndSavePassword();