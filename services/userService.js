require('dotenv').config();

// Import necessary modules and models
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Define userService functions
const userService = {
    // Function to register a new user
    registerUser: async (userData) => {
        try {
            // Hash the password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            userData.password = hashedPassword;
            // Save the user to the database
            await userData.save();

            const token = jwt.sign({ _id: userData._id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '4h' });
            
            return { userData, token };

        } catch (e) {
            console.log(e);
        }
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
