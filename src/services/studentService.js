const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Course = require('../models/course'); // Ensure you import the Course model

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
        console.log(`Authenticating student with registration number: ${registrationNumber}`);
        const student = await Student.findOne({ registrationNumber });
        if (!student || !(await bcrypt.compare(password, student.password))) {
            console.log('Authentication failed: Student not found or password incorrect');
            return null;
        }
        const token = jwt.sign({ userId: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { student, token };
    },

    getStudentByRegistrationNumber: async (registrationNumber) => {
        console.log(`Fetching student with registration number: ${registrationNumber}`);
        const student = await Student.findOne({ registrationNumber });
        return student;
    },

    updateStudentProfile: async (registrationNumber, updatedStudentData) => {
        console.log(`Updating student with registration number: ${registrationNumber}`);
        return await Student.findOneAndUpdate({ registrationNumber }, updatedStudentData, { new: true });
    },

    enrollStudentInCourse: async (registrationNumber, course) => {
        console.log(`Enrolling student with registration number: ${registrationNumber} in course with code: ${course.courseCode}`);

        const student = await Student.findOne({ registrationNumber });
        console.log('Student found:', student);
        if (!student) {
            throw new Error('Student not found');
        }

        // Validate and parse course data
        const { courseCode, title, credits } = course;
        if (!courseCode || !title || !credits) {
            throw new Error('Invalid course data');
        }

        // Check if the student is already enrolled in the course
        if (student.courses.some(c => c.courseCode === courseCode)) {
            throw new Error('Student is already enrolled in the course');
        }

        // Add the course to the student's courses directly
        student.courses.push({ courseCode, courseTitle: title, courseCredits: credits });

        return await student.save();
    },

    dropStudentFromCourse: async (registrationNumber, courseCode) => {
        console.log(`Dropping student with registration number: ${registrationNumber} from course with code: ${courseCode}`);
        const student = await Student.findOne({ registrationNumber });
        if (!student) {
            throw new Error('Student not found');
        }
        student.courses = student.courses.filter(course => course.courseCode !== courseCode);
        return await student.save();
    },

    getCoursesEnrolledByStudent: async (registrationNumber) => {
        try {
            const student = await Student.findOne({ registrationNumber }).populate('courses');
            if (!student) {
                throw new Error('Student not found');
            }
            return student.courses;
        } catch (error) {
            console.error('Error in getCoursesEnrolledByStudent:', error);
            throw error;
        }
    },

    getStudentsByInstructor: async (instructorId) => {
        try {
            // Find all courses taught by the instructor
            const courses = await Course.find({ instructor: instructorId });

            // Prepare a list to hold the result
            const result = {};

            // Loop through each course
            for (const course of courses) {
                // Find students enrolled in the current course
                const students = await Student.find({ 'courses.courseCode': course.courseCode });

                // Add to the result object
                result[course.courseCode] = students;
            }

            return result;
        } catch (error) {
            console.error('Error in getStudentsByInstructor:', error);
            throw error;
        }
    },
};

module.exports = studentService;
