const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// Get all departments
router.get('/', async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get department by ID
router.get('/:id', async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new department
router.post('/', async (req, res) => {
    try {
        const newDepartment = new Department(req.body);
        const savedDepartment = await newDepartment.save();
        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Update department by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete department by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.json(deletedDepartment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
