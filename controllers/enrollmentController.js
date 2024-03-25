// Import necessary modules and services
const enrollmentService = require('../services/enrollmentService');
const { validationResult } = require('express-validator');

// Define controller functions
const enrollmentController = {
    // Function to enroll a student in a course
    enrollStudentInCourse: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract enrollment data from request body
        const { studentId, courseId } = req.body;

        try {
            // Call enrollmentService to enroll student in course
            const enrollment = await enrollmentService.enrollStudentInCourse(studentId, courseId);
            res.status(201).json(enrollment);
        } catch (error) {
            console.error('Error enrolling student in course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to drop a student from a course
    dropStudentFromCourse: async (req, res) => {
        // Extract enrollment ID from request parameters
        const enrollmentId = req.params.id;

        try {
            // Call enrollmentService to drop student from course
            await enrollmentService.dropStudentFromCourse(enrollmentId);
            res.json({ message: 'Student dropped from course successfully' });
        } catch (error) {
            console.error('Error dropping student from course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get enrollments by student ID
    getEnrollmentsByStudentId: async (req, res) => {
        // Extract student ID from request parameters
        const studentId = req.params.studentId;

        try {
            // Call enrollmentService to fetch enrollments by student ID
            const enrollments = await enrollmentService.getEnrollmentsByStudentId(studentId);
            res.json(enrollments);
        } catch (error) {
            console.error('Error fetching enrollments by student ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get enrollments by course ID
    getEnrollmentsByCourseId: async (req, res) => {
        // Extract course ID from request parameters
        const courseId = req.params.courseId;

        try {
            // Call enrollmentService to fetch enrollments by course ID
            const enrollments = await enrollmentService.getEnrollmentsByCourseId(courseId);
            res.json(enrollments);
        } catch (error) {
            console.error('Error fetching enrollments by course ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export enrollmentController
module.exports = enrollmentController;
