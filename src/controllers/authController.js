const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Define controller functions
const authController = {
    // Function to register a new student
    register: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract registration data from request body
        const { registrationNumber, password } = req.body;

        try {
            // Check if student already exists
            const existingStudent = await authService.getStudentByRegistration(registrationNumber);
            if (existingStudent) {
                return res.status(400).json({ message: 'Student with this registration already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new student
            const newStudent = await authService.createStudent({ registrationNumber, email, password: hashedPassword });

            // Generate JWT token
            const token = jwt.sign({ studentId: newStudent._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({ token });
        } catch (error) {
            console.error('Error registering student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to login a student
    login: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract login data from request body
        const { registrationNumber, password } = req.body;

        try {
            // Check if student exists
            const student = await authService.getStudentByRegistration(registrationNumber);
            if (!student) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isPasswordValid = await bcrypt.compare(password, student.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.json({ token });
        } catch (error) {
            console.error('Error logging in student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export authController
module.exports = authController;
