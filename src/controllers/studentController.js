// Import necessary modules and services
const studentService = require('../services/studentService');
const { validationResult } = require('express-validator');

// Define controller functions
const studentController = {
    // Function to get all students
    getAllStudents: async (req, res) => {
        try {
            // Call studentService to fetch all students
            const students = await studentService.getAllStudents();
            res.json(students);
        } catch (error) {
            console.error('Error fetching students:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get a specific student by ID
    getStudentById: async (req, res) => {
        const studentId = req.params.id;
        try {
            // Call studentService to fetch student by ID
            const student = await studentService.getStudentById(studentId);
            if (!student) {
                return res.status(404).json({ message: 'Student not found' });
            }
            res.json(student);
        } catch (error) {
            console.error('Error fetching student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to create a new student
    createStudent: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract student data from request body
        const { name, email, registrationNumber, /* other fields */ } = req.body;

        try {
            // Call studentService to create new student
            const newStudent = await studentService.createStudent({ name, email, registrationNumber, /* other fields */ });
            res.status(201).json(newStudent);
        } catch (error) {
            console.error('Error creating student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to update an existing student
    updateStudent: async (req, res) => {
        const studentId = req.params.id;
        // Extract updated student data from request body
        const updatedStudentData = req.body;

        try {
            // Call studentService to update student
            const updatedStudent = await studentService.updateStudent(studentId, updatedStudentData);
            res.json(updatedStudent);
        } catch (error) {
            console.error('Error updating student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to delete a student
    deleteStudent: async (req, res) => {
        const studentId = req.params.id;
        try {
            // Call studentService to delete student
            await studentService.deleteStudent(studentId);
            res.json({ message: 'Student deleted successfully' });
        } catch (error) {
            console.error('Error deleting student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export studentController
module.exports = studentController;
