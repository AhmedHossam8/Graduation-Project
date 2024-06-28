const express = require('express');
const router = express.Router();
const Instructor = require('../models/instructor');

// Get all instructors
router.get('/all-instructors', async (req, res) => {
    try {
        const instructors = await Instructor.find();
        res.json(instructors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get instructor by ID
router.get('/:id', async (req, res) => {
    try {
        const instructor = await Instructor.findOne({ id: req.params.id });
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
        res.json(instructor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update instructor by Id
router.put('/update/:id', async (req, res) => {
    try {
        const updatedInstructor = await Instructor.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedInstructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
        res.json(updatedInstructor);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete instructor by Registration Number
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedInstructor = await Instructor.findOneAndDelete({ id: req.params.id });
        if (!deletedInstructor) {
            return res.status(404).json({ error: 'Instructor not found' });
        }
        res.json(deletedInstructor);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
