// Import necessary modules and models
const Grade = require('../models/gradeModel');

// Define gradeService functions
const gradeService = {
    // Function to add a grade for a student in a course
    addGrade: async (studentId, courseId, grade) => {
        // Create a new grade instance
        const newGrade = new Grade({
            student: studentId,
            course: courseId,
            grade: grade
        });

        // Save the grade to the database
        return await newGrade.save();
    },

    // Function to update a grade for a student in a course
    updateGrade: async (gradeId, newGradeValue) => {
        // Find the grade by its ID and update the grade value
        return await Grade.findByIdAndUpdate(gradeId, { grade: newGradeValue }, { new: true });
    },

    // Function to delete a grade
    deleteGrade: async (gradeId) => {
        // Find and delete the grade by its ID
        return await Grade.findByIdAndDelete(gradeId);
    },

    // Function to get all grades for a student
    getGradesByStudent: async (studentId) => {
        // Find all grades for the student
        return await Grade.find({ student: studentId });
    },

    // Function to get all grades for a course
    getGradesByCourse: async (courseId) => {
        // Find all grades for the course
        return await Grade.find({ course: courseId });
    }
};

// Export gradeService
module.exports = gradeService;
