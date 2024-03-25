// Import necessary modules and models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Define userService functions
const userService = {
    // Function to register a new user
    registerUser: async (userData) => {
        // Hash the password
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Create a new user instance
        const newUser = new User({
            username: userData.username,
            email: userData.email,
            password: hashedPassword
        });

        // Save the user to the database
        return await newUser.save();
    },

    // Function to authenticate a user
    authenticateUser: async (email, password) => {
        // Find the user by email
        const user = await User.findOne({ email });

        // If user not found or password does not match, return null
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return user data and token
        return { user, token };
    },

    // Function to retrieve user by ID
    getUserById: async (userId) => {
        return await User.findById(userId);
    },

    // Function to update user profile
    updateUserProfile: async (userId, updatedUserData) => {
        return await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    }
};

// Export userService
module.exports = userService;
