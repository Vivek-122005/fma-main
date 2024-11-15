const User = require("../models/auth.js");
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// User registration
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ firstName, lastName, email, password });
        const token = generateToken(user._id, user.role);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during registration:', error);  
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });


        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


        const token = generateToken(user._id, user.role);
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

