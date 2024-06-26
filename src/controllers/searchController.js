// Import necessary modules and services
const searchService = require('../services/searchService');

// Define controller functions
const searchController = {
    // Function to search for students by name or registration number
    searchStudents: async (req, res) => {
        // Extract search query from request query parameters
        const { query } = req.query;

        try {
            // Call searchService to search for students
            const results = await searchService.searchStudents(query);
            res.json(results);
        } catch (error) {
            console.error('Error searching for students:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to search for courses by name or code
    searchCourses: async (req, res) => {
        // Extract search query from request query parameters
        const { query } = req.query;

        try {
            // Call searchService to search for courses
            const results = await searchService.searchCourses(query);
            res.json(results);
        } catch (error) {
            console.error('Error searching for courses:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Function to search for instructors by name or email
    searchInstructors: async (req, res) => {
        // Extract search query from request query parameters
        const { query } = req.query;

        try {
            // Call searchService to search for instructors
            const results = await searchService.searchInstructors(query);
            res.json(results);
        } catch (error) {
            console.error('Error searching for instructors:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export searchController
module.exports = searchController;
