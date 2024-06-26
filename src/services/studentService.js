// Import necessary modules and models
const Student = require('../models/studentModel');

// Define studentService functions
const studentService = {
    // Function to enroll a student in a course
    enrollStudentInCourse: async (studentId, courseId) => {
        // Fetch the student from the database
        const student = await Student.findById(studentId);

        // Check if the student is already enrolled in the course
        if (student.courses.includes(courseId)) {
            throw new Error('Student is already enrolled in the course');
        }

        // Add the course to the student's list of enrolled courses
        student.courses.push(courseId);

        // Save the updated student data to the database
        return await student.save();
    },

    // Function to drop a student from a course
    dropStudentFromCourse: async (studentId, courseId) => {
        // Fetch the student from the database
        const student = await Student.findById(studentId);

        // Check if the student is enrolled in the course
        if (!student.courses.includes(courseId)) {
            throw new Error('Student is not enrolled in the course');
        }

        // Remove the course from the student's list of enrolled courses
        student.courses = student.courses.filter(id => id !== courseId);

        // Save the updated student data to the database
        return await student.save();
    },

    // Function to get courses enrolled by a student
    getCoursesEnrolledByStudent: async (studentId) => {
        // Fetch the student from the database
        const student = await Student.findById(studentId).populate('courses');

        // Return the list of enrolled courses
        return student.courses;
    }
};

// Export studentService
module.exports = studentService;
