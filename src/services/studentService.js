require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');

const studentService = {
    registerStudent: async (studentData) => {
        try {
            const hashedPassword = await bcrypt.hash(studentData.password, 10);
            studentData.password = hashedPassword;
            await studentData.save();
            const token = jwt.sign({ _id: studentData._id, email: studentData.email }, process.env.JWT_SECRET, { expiresIn: '4h' });
            return { studentData, token };
        } catch (e) {
            console.log(e);
        }
    },

    authenticateStudent: async (registrationNumber, password) => {
        const student = await Student.findOne({ registrationNumber });
        if (!student || !(await bcrypt.compare(password, student.password))) {
            return null;
        }
        const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { student, token };
    },

    getStudentByRegistrationNumber: async (registrationNumber) => {
        return await Student.findOne({ registrationNumber });
    },

    updateStudentProfile: async (registrationNumber, updatedStudentData) => {
        return await Student.findOneAndUpdate({ registrationNumber }, updatedStudentData, { new: true });
    },

    enrollStudentInCourse: async (registrationNumber, courseId) => {
        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            throw new Error('Student not found');
        }
        if (student.courses.includes(courseId)) {
            throw new Error('Student is already enrolled in the course');
        }
        student.courses.push(courseId);
        return await student.save();
    },

    dropStudentFromCourse: async (registrationNumber, courseId) => {
        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            throw new Error('Student not found');
        }
        if (!student.courses.includes(courseId)) {
            throw new Error('Student is not enrolled in the course');
        }
        student.courses = student.courses.filter(id => id !== courseId);
        return await student.save();
    },

    getCoursesEnrolledByStudent: async (registrationNumber) => {
        const student = await Student.findOne({ registrationNumber }).populate('courses');
        return student.courses;
    }
};

module.exports = studentService;
