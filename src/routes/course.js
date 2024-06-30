const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Get all courses
router.get('/search', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to fetch courses not enrolled by the student
router.get('/courses/not-enrolled/:registrationNumber', async (req, res) => {
    try {
        const { registrationNumber } = req.params;
        console.log('Fetching courses not enrolled for registrationNumber:', registrationNumber);
        const courses = await courseService.getCoursesNotEnrolledByStudent(registrationNumber);
        res.json(courses);
    } catch (error) {
        console.error('Error in fetching courses not enrolled:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get course by ID
router.get('/search/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add new course
router.post('/add', async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Update course by ID
router.put('/update/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Delete course by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.json(deletedCourse);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
