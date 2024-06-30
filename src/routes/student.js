const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const studentService = require('../services/studentService')

// Get all student
router.get('/students', async (req, res) => {
    try {
        const student = await Student.find();
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get student by registration number
router.get('/:registrationNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ registrationNumber: req.params.registrationNumber });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update student by Reg Number
router.put('/update/:registrationNumber', async (req, res) => {
    try {
        const updatedStudent = await Student.updateStudentProfile(req.params.registrationNumber, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete Student by Reg Number
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Enroll student in course
router.post('/enroll', async (req, res) => {
    try {
        const { registrationNumber, course } = req.body;

        const enrolledStudent = await studentService.enrollStudentInCourse(registrationNumber, course);
        res.json(enrolledStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get courses enrolled by a student
router.get('/courses/:registrationNumber', async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        const courses = await studentService.getCoursesEnrolledByStudent(registrationNumber);
        res.json(courses);
    } catch (error) {
        console.error('Error in /courses/:registrationNumber route:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Drop student from course
router.delete('/drop/:registrationNumber/:courseCode', async (req, res) => {
    try {
        const { registrationNumber, courseCode } = req.params;
        const droppedStudent = await studentService.dropStudentFromCourse(registrationNumber, courseCode);
        res.json(droppedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
