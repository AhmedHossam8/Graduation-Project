require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');
const instructorService = require('../services/instructorService');

// Register a new instructor
router.post('/register', async (req, res) => {
    try {
        const existingInstructor = await Instructor.findOne({ email: req.body.email });
        if (existingInstructor) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const { instructor, token } = await instructorService.registerInstructor(new Instructor({
            instructorId: req.body.instructorId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            role: req.body.role
        }));

        res.status(201).json({ message: 'Instructor registered successfully', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

// Login Instructor
router.post('/login', async (req, res) => {
    try {
        const { id, password } = req.body;
        const result = await instructorService.authenticateInstructor(id, password);
        if (result) {
            const tokenPayload = {
                id: result.instructor.id,
                email: result.instructor.email
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.header('auth-token', token).json({
                success: true,
                message: 'Authentication successful',
                token: token,
                instructor: tokenPayload
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid ID or password'
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
        console.error(error);
    }
});

module.exports = router;
