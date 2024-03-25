// Import necessary modules and models
const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const Instructor = require('../models/instructorModel');

// Define searchService functions
const searchService = {
    // Function to search for students by name or registration number
    searchStudents: async (query) => {
        // Search for students by name or registration number
        return await Student.find({ $or: [{ name: { $regex: query, $options: 'i' } }, { registrationNumber: query }] });
    },

    // Function to search for courses by title or code
    searchCourses: async (query) => {
        // Search for courses by title or code
        return await Course.find({ $or: [{ title: { $regex: query, $options: 'i' } }, { code: query }] });
    },

    // Function to search for instructors by name
    searchInstructors: async (query) => {
        // Search for instructors by name
        return await Instructor.find({ name: { $regex: query, $options: 'i' } });
    }
};

// Export searchService
module.exports = searchService;
