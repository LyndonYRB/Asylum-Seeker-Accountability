const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Create a new user
exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username); // Debugging log
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the password with the hashed password
        const isMatch = await user.comparePassword(password);
        console.log(`Comparing passwords: user-provided password "${password}" vs. hashed password in DB`);
        console.log('Password comparison result:', isMatch); // Debugging log
        console.log(`Password provided by user: ${password}`);
console.log(`Hashed password in the database: ${user.password}`);
console.log(`Password match result: ${isMatch}`); // Debugging log

        if (!isMatch) {
            console.log('Password does not match'); // Debugging log
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Login successful, token generated'); // Debugging log
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error); // Debugging log
        res.status(500).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
