// Import necessary modules and services
const instructorService = require('../services/instructorService');
const { validationResult } = require('express-validator');

// Define controller functions
const instructorController = {
    // Function to get all instructors
    getAllInstructors: async (req, res) => {
        try {
            // Call instructorService to fetch all instructors
            const instructors = await instructorService.getAllInstructors();
            res.json(instructors);
        } catch (error) {
            console.error('Error fetching instructors:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to get a specific instructor by ID
    getInstructorById: async (req, res) => {
        const instructorId = req.params.id;
        try {
            // Call instructorService to fetch instructor by ID
            const instructor = await instructorService.getInstructorById(instructorId);
            if (!instructor) {
                return res.status(404).json({ message: 'Instructor not found' });
            }
            res.json(instructor);
        } catch (error) {
            console.error('Error fetching instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to create a new instructor
    createInstructor: async (req, res) => {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract instructor data from request body
        const { name, email, /* other fields */ } = req.body;

        try {
            // Call instructorService to create new instructor
            const newInstructor = await instructorService.createInstructor({ name, email, /* other fields */ });
            res.status(201).json(newInstructor);
        } catch (error) {
            console.error('Error creating instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to update an existing instructor
    updateInstructor: async (req, res) => {
        const instructorId = req.params.id;
        // Extract updated instructor data from request body
        const updatedInstructorData = req.body;

        try {
            // Call instructorService to update instructor
            const updatedInstructor = await instructorService.updateInstructor(instructorId, updatedInstructorData);
            res.json(updatedInstructor);
        } catch (error) {
            console.error('Error updating instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to delete an instructor
    deleteInstructor: async (req, res) => {
        const instructorId = req.params.id;
        try {
            // Call instructorService to delete instructor
            await instructorService.deleteInstructor(instructorId);
            res.json({ message: 'Instructor deleted successfully' });
        } catch (error) {
            console.error('Error deleting instructor:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export instructorController
module.exports = instructorController;
