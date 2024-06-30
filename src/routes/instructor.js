const express = require('express');
const router = express.Router();
const Instructor = require('../models/instructor');
const instructorService = require('../services/instructorService'); // Import the instructorService
const studentService = require('../services/studentService'); // Import the studentService

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

// Delete instructor by id Number
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

// Add course to instructor by id Number
router.post('/addCourse/:id', async (req, res) => {
    try {
        const updatedInstructor = await Instructor.findOneAndUpdate(
            { id: req.params.id },
            { courses: req.params.courseId },
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

// Get courses by instructor ID
router.get('/courses/:instructorId', async (req, res) => {
    try {
        const courses = await instructorService.getCoursesByInstructorId(req.params.instructorId);
        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: 'No courses found for this instructor' });
        }
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses by instructor ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get students by instructor ID
router.get('/students/:instructorId', async (req, res) => {
    try {
        const studentsByCourse = await studentService.getStudentsByInstructor(req.params.instructorId);
        if (!studentsByCourse || Object.keys(studentsByCourse).length === 0) {
            console.log('No students found for courses taught by this instructor');
            return res.status(404).json({ error: 'No students found for courses taught by this instructor' });
        }
        res.json(studentsByCourse);
    } catch (error) {
        console.error(`Error fetching students for instructor with ID: ${req.params.instructorId}`, error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
