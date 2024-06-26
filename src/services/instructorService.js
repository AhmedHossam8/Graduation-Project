// Import necessary modules and models
const Instructor = require('../models/instructorModel');

// Define instructorService functions
const instructorService = {
    // Function to create a new instructor
    createInstructor: async (instructorData) => {
        // Create a new instructor instance
        instructorData.role = "Instructor"
        const newInstructor = new Instructor(instructorData);

        // Save the instructor to the database
        return await newInstructor.save();
    },

    // Function to retrieve an instructor by ID
    getInstructorById: async (instructorId) => {
        return await Instructor.findById(instructorId);
    },

    // Function to update instructor information
    updateInstructor: async (instructorId, updatedInstructorData) => {
        return await Instructor.findByIdAndUpdate(instructorId, updatedInstructorData, { new: true });
    },

    // Function to delete an instructor
    deleteInstructor: async (instructorId) => {
        return await Instructor.findByIdAndDelete(instructorId);
    }
};

// Export instructorService
module.exports = instructorService;
