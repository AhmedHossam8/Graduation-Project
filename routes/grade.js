const express = require('express');
const router = express.Router();
const Grade = require('../models/grade');

// Get all grades
router.get('/', async (req, res) => {
    try {
        const grades = await Grade.find();
        res.json(grades);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get grade by ID
router.get('/:id', async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.json(grade);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new grade
router.post('/', async (req, res) => {
    try {
        const newGrade = new Grade(req.body);
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Update grade by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedGrade = await Grade.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGrade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.json(updatedGrade);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete grade by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
        if (!deletedGrade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.json(deletedGrade);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
