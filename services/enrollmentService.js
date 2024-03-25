// Import necessary modules and models
const Enrollment = require('../models/enrollmentModel');

// Define enrollmentService functions
const enrollmentService = {
    // Function to enroll a student in a course
    enrollStudentInCourse: async (studentId, courseId) => {
        // Create a new enrollment record
        const newEnrollment = new Enrollment({
            student: studentId,
            course: courseId
        });

        // Save the enrollment record to the database
        return await newEnrollment.save();
    },

    // Function to drop a student from a course
    dropStudentFromCourse: async (studentId, courseId) => {
        // Find and delete the enrollment record
        return await Enrollment.findOneAndDelete({ student: studentId, course: courseId });
    },

    // Function to get all courses enrolled by a student
    getCoursesEnrolledByStudent: async (studentId) => {
        // Find all enrollment records for the student
        const enrollments = await Enrollment.find({ student: studentId }).populate('course');

        // Extract course information from the enrollments
        const courses = enrollments.map(enrollment => enrollment.course);

        return courses;
    }
};

// Export enrollmentService
module.exports = enrollmentService;
