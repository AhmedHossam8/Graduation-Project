const Course = require('../models/course');

const courseService = {
    createCourse: async (courseData) => {
        const newCourse = new Course(courseData);
        return await newCourse.save();
    },

    getCourseById: async (courseId) => {
        return await Course.findById(courseId);
    },

    updateCourse: async (courseId, updatedCourseData) => {
        return await Course.findByIdAndUpdate(courseId, updatedCourseData, { new: true });
    },

    deleteCourse: async (courseId) => {
        return await Course.findByIdAndDelete(courseId);
    },

    getAllCourses: async () => {
        return await Course.find();
    },

    getCoursesNotEnrolledByStudent: async (registrationNumber) => {
        try {
            // Find the student by registration number
            const student = await Student.findOne({ registrationNumber });
            if (!student) {
                throw new Error('Student not found');
            }

            // Get all courses
            const allCourses = await Course.find();

            // Filter courses that the student is already enrolled in
            const coursesNotEnrolled = allCourses.filter(course => {
                return !student.courses.some(sCourse => sCourse.courseCode === course.courseCode);
            });

            return coursesNotEnrolled;
        } catch (error) {
            console.error('Error in getCoursesNotEnrolledByStudent:', error);
            throw error;
        }
    },
};

module.exports = courseService;
