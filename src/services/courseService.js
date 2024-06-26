// Import necessary modules and models
const Course = require('../models/courseModel');

// Define courseService functions
const courseService = {
    // Function to create a new course
    createCourse: async (courseData) => {
        // Create a new course instance
        const newCourse = new Course(courseData);

        // Save the course to the database
        return await newCourse.save();
    },

    // Function to retrieve a course by ID
    getCourseById: async (courseId) => {
        return await Course.findById(courseId);
    },

    // Function to update course information
    updateCourse: async (courseId, updatedCourseData) => {
        return await Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true });
    },

    // Function to delete a course
    deleteCourse: async (courseId) => {
        return await Course.findByIdAndDelete(courseId);
    },

    // Function to get all courses
    getAllCourses: async () => {
        return await Course.find();
    }
};

// Export courseService
module.exports = courseService;
