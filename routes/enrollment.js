const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');

// Get all enrollments
router.get('/all-enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get enrollment by ID
router.get('/enrollment/:id', async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(enrollment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new enrollment
router.post('/add', async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        const savedEnrollment = await newEnrollment.save();
        res.status(201).json(savedEnrollment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Update enrollment by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(updatedEnrollment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete enrollment by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
        if (!deletedEnrollment) {
            return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(deletedEnrollment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
