require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');
const Course = require('../models/course'); // Import the Course model

const instructorService = {
    registerInstructor: async (instructorData) => {
        try {
            const hashedPassword = await bcrypt.hash(instructorData.password, 10);
            instructorData.password = hashedPassword;
            await instructorData.save();
            const token = jwt.sign({ _id: instructorData._id, email: instructorData.email }, process.env.JWT_SECRET, { expiresIn: '4h' });
            return { instructor: instructorData, token };
        } catch (e) {
            console.log(e);
            throw e;
        }
    },

    authenticateInstructor: async (id, password) => {
        const instructor = await Instructor.findOne({ id });
        if (!instructor || !(await bcrypt.compare(password, instructor.password))) {
            return null;
        }
        const token = jwt.sign({ userId: instructor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { instructor, token };
    },

    getInstructorById: async (instructorId) => {
        return await Instructor.findById(instructorId);
    },

    updateInstructorProfile: async (instructorId, updatedInstructorData) => {
        return await Instructor.findByIdAndUpdate(instructorId, updatedInstructorData, { new: true });
    },

    getCoursesByInstructorId: async (instructorId) => {
        try {
            // Ensure we are using the correct field to find the instructor
            const instructor = await Instructor.findById(instructorId);
            if (!instructor) {
                throw new Error('Instructor not found');
            }

            // Find courses by the instructor's _id
            const courses = await Course.find({ instructor: instructor._id });
            return courses;
        } catch (error) {
            console.error('Error fetching courses by instructor ID:', error);
            throw error;
        }
    },

    getStudentsByInstructor: async (instructorId) => {
        try {
            const courses = await Course.find({ instructor: instructorId });
            if (!courses || courses.length === 0) {
                throw new Error('No courses found for this instructor');
            }

            const studentsByCourse = {};
            for (const course of courses) {
                const students = await Student.find({ 'courses.courseCode': course.courseCode });
                studentsByCourse[course.courseCode] = students;
            }

            return studentsByCourse;
        } catch (error) {
            console.error(`Error fetching students for instructor ID: ${instructorId}`, error);
            throw error;
        }
    }
};

module.exports = instructorService;
