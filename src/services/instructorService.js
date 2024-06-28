require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Instructor = require('../models/instructor');

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
    }
};

module.exports = instructorService;
