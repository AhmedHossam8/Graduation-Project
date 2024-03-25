// Import necessary modules and services
const gradeService = require('../services/gradeService');
const { validationResult } = require('express-validator');

// Define controller functions
const gradeController = {
    // Function to get all grades
    getAllGrades: async (req, res) => {
        try {
            // Call gradeService to fetch all grades
            const grades = await gradeService.getAllGrades();
            res.json(grades);
        } catch (error) {
            console.error('Error fetching grades:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get grades by student
    getGradesByStudent: async (req, res) => {
        const studentId = req.params.studentId;
        try {
            // Call gradeService to fetch grades by student
            const grades = await gradeService.getGradesByStudent(studentId);
            res.json(grades);
        } catch (error) {
            console.error('Error fetching grades by student:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to create a new grade
    createGrade: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract grade data from request body
        const { studentId, courseId, grade } = req.body;

        try {
            // Call gradeService to create new grade
            const newGrade = await gradeService.createGrade({ studentId, courseId, grade });
            res.status(201).json(newGrade);
        } catch (error) {
            console.error('Error creating grade:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to update an existing grade
    updateGrade: async (req, res) => {
        const gradeId = req.params.id;
        // Extract updated grade data from request body
        const updatedGradeData = req.body;

        try {
            // Call gradeService to update grade
            const updatedGrade = await gradeService.updateGrade(gradeId, updatedGradeData);
            res.json(updatedGrade);
        } catch (error) {
            console.error('Error updating grade:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to delete a grade
    deleteGrade: async (req, res) => {
        const gradeId = req.params.id;
        try {
            // Call gradeService to delete grade
            await gradeService.deleteGrade(gradeId);
            res.json({ message: 'Grade deleted successfully' });
        } catch (error) {
            console.error('Error deleting grade:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export gradeController
module.exports = gradeController;
