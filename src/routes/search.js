const express = require('express');
const router = express.Router();
const Student = require('../models/user');

// Search for students by registration number
router.get('/students', async (req, res) => {
    try {
        const registrationNumber = req.query.registrationNumber;
        if (!registrationNumber) {
            return res.status(400).json({ error: 'Registration number is required' });
        }
        
        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
