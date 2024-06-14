require('dotenv').config();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userService = require('../services/userService')

// Register a new user
router.post('/register', async (req, res) => {
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

         // Create a new user
        const obj = await userService.registerUser(new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            registrationNumber: req.body.registrationNumber,
            password: req.body.password, // Store the hashed password
            role: req.body.role
        }))

        const token = obj.token;
        
        // Send a success response
        res.status(201).json({ message: 'User registered successfully', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        // Check if the email exists
        const obj = await userService.authenticateUser(req.body.email, req.body.password);

        const token = obj.token;
        const user = obj.user;

        res.header('auth-token', token).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

module.exports = router;
