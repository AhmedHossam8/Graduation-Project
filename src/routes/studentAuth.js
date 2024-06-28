require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const studentService = require('../services/studentService');

// Register a new student
router.post('/register', async (req, res) => {
    try {
        const existingStudent = await Student.findOne({ email: req.body.email });
        if (existingStudent) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const obj = await studentService.registerStudent(new Student({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            registrationNumber: req.body.registrationNumber,
            password: req.body.password,
            term: req.body.term
        }));

        const token = jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Student registered successfully', token: token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
});

// Login Student
router.post('/login', async (req, res) => {
    try {
        const { registrationNumber, password } = req.body;
        const result = await studentService.authenticateStudent(registrationNumber, password);
        if (result) {
            const tokenPayload = {
                id: result.student.id,
                registrationNumber: result.student.registrationNumber,
                email: result.student.email,
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.header('auth-token', token).json({
                success: true,
                message: 'Authentication successful',
                token: token,
                student: tokenPayload
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid registration number or password'
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
        console.error(error);
    }
});

module.exports = router;
